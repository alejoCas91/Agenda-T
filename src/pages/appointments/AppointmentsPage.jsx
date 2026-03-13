import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import useRole from "../../hooks/useRole";
import Badge from "../../ui/components/Badge";

import { sileo } from "sileo";

export default function AppointmentsPage() {
  const { role } = useRole();

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function loadAppointments() {
      const { data, error } = await supabase.from("appointments").select(`
            id,
            status,
            date_time,
            services(name),
            clients(name,email)
          `);

      if (error) {
        sileo.error({
          title: "Error loading appointments",
        });

        return;
      }

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

            if (payload.eventType === "UPDATE") {
              return prev.map((a) =>
                a.id === payload.new.id ? payload.new : a,
              );
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

  async function handleCancel(id) {
    const { error } = await supabase
      .from("appointments")
      .update({ status: "cancelled" })
      .eq("id", id);

    if (error) {
      sileo.error({
        title: "Cancel failed",
      });
    }
  }

  async function handleComplete(id) {
    const { error } = await supabase
      .from("appointments")
      .update({ status: "completed" })
      .eq("id", id);

    if (error) {
      sileo.error({
        title: "Update failed",
      });
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Appointments</h1>

      <div className="flex flex-col gap-4">
        {appointments.map((app) => (
          <div
            key={app.id}
            className="border rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{app.services?.name}</p>

              <p className="text-sm text-gray-500">{app.clients?.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <Badge status={app.status} />

              {role === "client" && app.status === "scheduled" && (
                <button
                  onClick={() => handleCancel(app.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              )}

              {(role === "boss" || role === "admin") &&
                app.status === "scheduled" && (
                  <button
                    onClick={() => handleComplete(app.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Complete
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
