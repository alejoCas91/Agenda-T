import { useEffect, useState } from "react";
import { appointmentsApi } from "../data/apis/appointmentsApi";
import { supabase } from "../lib/supabase";

export default function useAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      const data = await appointmentsApi.getAll();
      setAppointments(data || []);
    }

    fetchAppointments();

    const channel = supabase
      .channel("appointments-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "appointments" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setAppointments((prev) => [...prev, payload.new]);
          }

          if (payload.eventType === "UPDATE") {
            setAppointments((prev) =>
              prev.map((a) => (a.id === payload.new.id ? payload.new : a)),
            );
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

  async function createAppointment(payload) {
    const data = await appointmentsApi.create(payload);

    setAppointments((prev) => [...prev, ...data]);
  }

  async function changeStatus(id, status) {
    const previous = appointments;

    /* opt upd */
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a)),
    );

    try {
      await appointmentsApi.updateStatus(id, status);
    } catch (error) {
      console.error(error);
      setAppointments(previous);
    }
  }

  return { appointments, createAppointment, changeStatus };
}
