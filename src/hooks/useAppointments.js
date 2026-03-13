import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  }

  useEffect(() => {
    async function fetchAppointments() {
      await loadAppointments();
    }
    fetchAppointments();

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
          if (payload.eventType === "INSERT") {
            setAppointments((prev) => {
              const exists = prev.find((a) => a.id === payload.new.id);

              if (exists) return prev;

              return [...prev, payload.new];
            });
          }

          if (payload.eventType === "DELETE") {
            setAppointments((prev) =>
              prev.filter((a) => a.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    appointments,
    loading,
  };
}
