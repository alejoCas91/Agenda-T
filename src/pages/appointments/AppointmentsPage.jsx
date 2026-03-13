import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function loadAppointments() {
      const { data } = await supabase.from("appointments").select(`
            id,
            date_time,
            status,
            services(name),
            clients(name,email)
          `);

      setAppointments(data || []);
    }

    loadAppointments();

    const channel = supabase
      .channel("appointments-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "appointments",
        },
        (payload) => {
          setAppointments((prev) => {
            if (payload.eventType === "INSERT") {
              return [...prev, payload.new];
            }

            if (payload.eventType === "DELETE") {
              return prev.filter((a) => a.id !== payload.old.id);
            }

            return prev;
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Appointments</h1>

      <div className="flex flex-col gap-4">
        {appointments.map((app) => (
          <div key={app.id} className="border rounded p-4 flex justify-between">
            <div>
              <p className="font-semibold">{app.services?.name}</p>

              <p className="text-sm text-gray-500">{app.clients?.email}</p>
            </div>

            <p>{app.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
