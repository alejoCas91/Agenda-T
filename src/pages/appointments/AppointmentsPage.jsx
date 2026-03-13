import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import useRole from "../../hooks/useRole";
import { sileo } from "sileo";

export default function AppointmentsPage() {
  const { role } = useRole();

  const [appointments, setAppointments] = useState([]);

  async function loadAppointments() {
    const { data } = await supabase.from("appointments").select(`
          id,
          date_time,
          services (
            id,
            name
          ),
          clients (
            id,
            name,
            email
          )
        `);

    setAppointments(data || []);
  }

  useEffect(() => {
    async function fetchAppointments() {
      await loadAppointments();
    }
    fetchAppointments();
  }, []);

  async function handleDelete(id) {
    try {
      await supabase.from("appointments").delete().eq("id", id);

      setAppointments((prev) => prev.filter((a) => a.id !== id));

      sileo.success({
        title: "Reservation removed",
      });
    } catch {
      sileo.error({
        title: "Delete failed",
      });
    }
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
              onClick={() => handleDelete(app.id)}
              className="text-red-500"
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
