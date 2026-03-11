import { useState } from "react";
import CourseCard from "../../ui/components/CourseCard";
import PageHeader from "../../ui/components/PageHeader";
import Button from "../../ui/components/Button";
import useServices from "../../hooks/useServices";
import useAppointments from "../../hooks/useAppointments";
import { clientsApi } from "../../data/apis/clientsApi";
import useUser from "../../hooks/useUser";

export default function ServicesPage() {
  const { services, createService } = useServices();
  const { createAppointment } = useAppointments();
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const user = useUser();

  async function handleCreate() {
    await createService({
      name,
      duration_minutes: Number(duration),
      price_cents: 5000,
      user_id: "00000000-0000-0000-0000-000000000000",
    });

    setName("");
    setDuration("");
  }

  async function handleBook(service) {
    try {
      const client = await clientsApi.getFirst();
      console.log("CLIENT:", client);
      if (!client) {
        console.error("No client found in database");
        return;
      }
      await createAppointment({
        service_id: service.id,
        client_id: client.id,
        user_id: client.user_id,
        date_time: new Date().toISOString(),
        status: "scheduled",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Services" description="Manage available services" />
      <div className="flex gap-2">
        <input
          placeholder="Service name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        {user.role === "admin" && (
          <Button onClick={handleCreate}>Create</Button>
        )}
      </div>
      <div className="grid grid-cols-3 gap-6">
        {services.map((service) => (
          <CourseCard key={service.id} service={service} onBook={handleBook} />
        ))}
      </div>
    </div>
  );
}
