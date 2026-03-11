import PageHeader from "../../ui/components/PageHeader";
import useAppointments from "../../hooks/useAppointments";

export default function AppointmentsPage() {
  const { appointments, changeStatus } = useAppointments();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Appointments"
        description="Manage scheduled appointments"
      />

      <div className="grid gap-4">
        {appointments.map((a) => (
          <div
            key={a.id}
            className="bg-white border rounded-xl p-4 flex flex-col gap-2"
          >
            <p className="font-semibold">{a.services?.name}</p>

            <p>Status: {a.status}</p>

            <p>{new Date(a.date_time).toLocaleString()}</p>

            <div className="flex gap-2">
              <button onClick={() => changeStatus(a.id, "completed")}>
                Complete
              </button>

              <button onClick={() => changeStatus(a.id, "cancelled")}>
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
