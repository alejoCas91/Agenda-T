import PageHeader from "../../ui/components/PageHeader";
import useAppointments from "../../hooks/useAppointments";

export default function AppointmentsPage() {
  const { appointments } = useAppointments();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Appointments"
        description="Manage scheduled appointments"
      />

      <div className="grid gap-4">
        {appointments.map((a) => (
          <div key={a.id} className="bg-white border rounded-xl p-4">
            <p className="font-semibold">{a.services?.name}</p>

            <p>Status: {a.status}</p>

            <p>Date: {new Date(a.date_time).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
