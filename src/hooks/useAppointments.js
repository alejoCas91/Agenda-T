import { useEffect, useState } from "react";
import { appointmentsApi } from "../data/apis/appointmentsApi";

export default function useAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const data = await appointmentsApi.getAll();
        setAppointments(data || []);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAppointments();
  }, []);

  async function createAppointment(payload) {
    const data = await appointmentsApi.create(payload);

    setAppointments((prev) => [...prev, ...data]);
  }

  return { appointments, createAppointment };
}
