import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function useAppointments() {
  const [appointments, setAppointments] = useState([]);

  async function createAppointment(service) {
    const { data: userData } = await supabase.auth.getUser();

    const user = userData.user;

    const { data: client } = await supabase
      .from("clients")
      .select("id")
      .eq("user_id", user.id)
      .single();

    const optimistic = {
      id: crypto.randomUUID(),
      service_id: service.id,
      client_id: client.id,
      services: service,
      status: "scheduled",
    };

    setAppointments((prev) => [...prev, optimistic]);

    try {
      const { data, error } = await supabase
        .from("appointments")
        .insert({
          client_id: client.id,
          service_id: service.id,
          user_id: user.id,
          date_time: new Date(),
          status: "scheduled",
        })
        .select();

      if (error) throw error;

      setAppointments((prev) =>
        prev.map((a) => (a.id === optimistic.id ? data[0] : a)),
      );
    } catch (err) {

      setAppointments((prev) => prev.filter((a) => a.id !== optimistic.id));

      throw err;
    }
  }

  return {
    appointments,
    createAppointment,
  };
}
