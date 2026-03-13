import { useState } from "react";

import PageHeader from "../../ui/components/PageHeader";
import Button from "../../ui/components/Button";
import CourseCard from "../../ui/components/CourseCard";

import useServices from "../../hooks/useServices";
import useRole from "../../hooks/useRole";

import { sileo } from "sileo";

export default function ServicesPage() {
  const { services, createService, deleteService, approveService, loading } =
    useServices();

  const { role } = useRole();

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  async function handleCreate() {
    if (!name || !duration) {
      sileo.error({
        title: "Missing fields",
        description: "Name and duration are required",
      });

      return;
    }

    try {
      await createService({
        name,
        duration_minutes: Number(duration),
        price_cents: 5000,
      });

      setName("");
      setDuration("");

      sileo.success({
        title: "Course created",
        description: "Waiting for admin approval",
      });
    } catch (err) {
      const message = err?.message || "Unexpected error";

      sileo.error({
        title: "Create failed",
        description: message,
      });
    }
  }

  async function handleDelete(id) {
    try {
      await deleteService(id);

      sileo.success({
        title: "Course deleted",
        description: "Service removed",
      });
    } catch {
      sileo.error({
        title: "Delete failed",
        description: "Service has appointments",
      });
    }
  }

  async function handleApprove(id) {
    try {
      await approveService(id);

      sileo.success({
        title: "Course approved",
        description: "Clients can now see this course",
      });
    } catch {
      sileo.error({
        title: "Approve failed",
        description: "Unexpected error",
      });
    }
  }

  if (loading) {
    return <div className="p-6">Loading services...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Services"
        description="Manage courses and services"
        action={
          role === "boss" && (
            <Button onClick={handleCreate}>Create Course</Button>
          )
        }
      />

      {role === "boss" && (
        <div className="flex gap-2">
          <input
            className="border rounded-lg px-3 py-2"
            placeholder="Course name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border rounded-lg px-3 py-2"
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
      )}

      {services.length === 0 && (
        <div className="text-gray-500">No courses available</div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="flex flex-col gap-2">
            <CourseCard service={service} />

            <span className="text-sm text-gray-500">
              Status: {service.status}
            </span>

            {role === "admin" && service.status === "pending" && (
              <button
                onClick={() => handleApprove(service.id)}
                className="text-green-500 text-sm"
              >
                Approve Course
              </button>
            )}

            {role === "admin" && (
              <button
                onClick={() => handleDelete(service.id)}
                className="text-red-500 text-sm"
              >
                Delete Course
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
