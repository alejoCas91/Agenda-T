import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import CourseCard from "../../ui/components/CourseCard";
import Button from "../../ui/components/Button";
import PageHeader from "../../ui/components/PageHeader";

import useRole from "../../hooks/useRole";
import { sileo } from "sileo";

export default function ServicesPage() {
  const { role } = useRole();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function loadServices() {
      let query = supabase.from("services").select("*");

      if (role === "client") {
        query = query.eq("status", "approved");
      }

      const { data, error } = await query;

      if (error) {
        sileo.error({
          title: "Error loading courses",
        });
        return;
      }

      setServices(data || []);
      setLoading(false);
    }

    loadServices();

    const channel = supabase
      .channel("services-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "services",
        },
        (payload) => {
          setServices((prev) => {
            if (payload.eventType === "INSERT") {
              return [...prev, payload.new];
            }

            if (payload.eventType === "UPDATE") {
              return prev.map((s) =>
                s.id === payload.new.id ? payload.new : s,
              );
            }

            if (payload.eventType === "DELETE") {
              return prev.filter((s) => s.id !== payload.old.id);
            }

            return prev;
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [role]);

  async function handleCreate() {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      const { error } = await supabase
        .from("services")
        .insert({
          name,
          duration_minutes: Number(duration),
          price_cents: Number(price),
          description,
          user_id: user.id,
          status: "pending",
        })
        .select();

      if (error) throw error;

      setName("");
      setDuration("");
      setPrice("");
      setDescription("");

      sileo.success({
        title: "Course created",
        description: "Waiting for admin approval",
      });
    } catch {
      sileo.error({
        title: "Failed to create course",
      });
    }
  }

  async function handleApprove(id) {
    const oldServices = [...services];

    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "approved" } : s)),
    );

    const { error } = await supabase
      .from("services")
      .update({ status: "approved" })
      .eq("id", id);

    if (error) {
      setServices(oldServices);

      sileo.error({
        title: "Approval failed",
      });
    } else {
      sileo.success({
        title: "Course approved",
      });
    }
  }

  async function handleDelete(id) {
    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) {
      sileo.error({
        title: "Delete failed",
      });
    }
  }

  if (loading) {
    return <div className="p-6">Loading courses...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Courses" description="Manage available courses" />

      {/* CREATE COURSE */}

      {role === "boss" && (
        <div className="border rounded-xl p-4 flex flex-col gap-3 max-w-md">
          <h2 className="font-semibold">Create Course</h2>

          <input
            placeholder="Course name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <input
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <input
            placeholder="Price (cents)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <Button onClick={handleCreate}>Create Course</Button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="flex flex-col gap-2">
            <CourseCard service={service} />

            {role === "admin" && service.status !== "approved" && (
              <Button onClick={() => handleApprove(service.id)}>Approve</Button>
            )}

            {(role === "admin" || role === "boss") && (
              <Button onClick={() => handleDelete(service.id)}>Delete</Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
