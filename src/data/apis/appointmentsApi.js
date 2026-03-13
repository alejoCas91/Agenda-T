import useAppointments from "../../hooks/useAppointments";
import useRole from "../../hooks/useRole";
import { supabase } from "../../lib/supabase";
import ConfirmDialog from "../../ui/components/ConfirmDialog";
import { useState } from "react";
import { sileo } from "sileo";

export default function AppointmentsPage() {
  const { appointments, loading } = useAppointments();
  const { role } = useRole();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  function handleAskDelete(id) {
    setSelected(id);
    setOpen(true);
  }

  async function handleDelete() {
    try {
      await supabase.from("appointments").delete().eq("id", selected);

      sileo.success({
        title: "Reservation removed",
      });
    } catch {
      sileo.error({
        title: "Failed to remove reservation",
      });
    }

    setOpen(false);
  }

  if (loading) {
    return <div className="p-6">Loading reservations...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Reservations</h1>

      {appointments.length === 0 && <p>No reservations yet</p>}

      {appointments.map((app) => (
        <div
          key={app.id}
          className="border rounded-lg p-4 flex justify-between"
        >
          <div>
            <p className="font-semibold">{app.services?.name}</p>

            <p className="text-sm text-gray-500">{app.clients?.name}</p>
          </div>

          {(role === "boss" || role === "admin") && (
            <button
              onClick={() => handleAskDelete(app.id)}
              className="text-red-500"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <ConfirmDialog
        open={open}
        onConfirm={handleDelete}
        onCancel={() => setOpen(false)}
        title="Delete reservation?"
        description="This action cannot be undone"
      />
    </div>
  );
}
