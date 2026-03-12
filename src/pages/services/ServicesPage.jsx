import { useState } from "react";
import PageHeader from "../../ui/components/PageHeader";
import CourseCard from "../../ui/components/CourseCard";
import Button from "../../ui/components/Button";
import ConfirmDialog from "../../ui/components/ConfirmDialog";
import useServices from "../../hooks/useServices";
import { sileo } from "sileo";

export default function ServicesPage() {
  const { services, createService, deleteService, loading, error } =
    useServices();

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  async function handleCreate() {
    if (!name || !duration) return;

    try {
      await createService({
        name,
        duration_minutes: Number(duration),
        price_cents: 5000,
        user_id: "00000000-0000-0000-0000-000000000000",
      });

      setName("");
      setDuration("");

      sileo.success("Service created");
    } catch {
      sileo.error("Error creating service");
    }
  }

  async function handleDelete() {
    try {
      await deleteService(selected);

      sileo.success("Service deleted");
    } catch {
      sileo.error("Cannot delete service with appointments");
    }

    setOpen(false);
    setSelected(null);
  }

  if (loading) {
    return <div className="p-6">Loading services...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error loading services</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Services"
        description="Manage available services"
        action={<Button onClick={handleCreate}>Create</Button>}
      />

      <div className="flex gap-2">
        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Service name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      {services.length === 0 && (
        <div className="text-gray-500">No services yet</div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {services.map((service) => (
          <CourseCard
            key={service.id}
            service={service}
            onDelete={() => {
              setSelected(service.id);
              setOpen(true);
            }}
          />
        ))}
      </div>

      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        title="Delete service"
        message="Are you sure you want to delete this service?"
      />
    </div>
  );
}
