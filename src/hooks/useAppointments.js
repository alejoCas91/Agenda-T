import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { appointmentsApi } from "../data/apis/appointmentsApi";

export default function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const data = await appointmentsApi.getAll();

      setAppointments(data || []);

      setLoading(false);
    }

    init();
  }, []);

  async function createAppointment(serviceId) {
    const { data: userData } = await supabase.auth.getUser();

    const user = userData.user;

    const { data: client } = await supabase
      .from("clients")
      .select("id")
      .eq("user_id", user.id)
      .single();

    const data = await appointmentsApi.create({
      client_id: client.id,
      service_id: serviceId,
      date_time: new Date(),
      status: "scheduled",
    });

    setAppointments((prev) => [...prev, ...data]);
  }

  async function cancelAppointment(id) {
    await appointmentsApi.remove(id);

    setAppointments((prev) => prev.filter((a) => a.id !== id));
  }

  return {
    appointments,
    createAppointment,
    cancelAppointment,
    loading,
  };
}
