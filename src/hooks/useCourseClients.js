import { useEffect, useState } from "react";
import { appointmentsApi } from "../data/apis/appointmentsApi";

export default function useCourseClients(serviceId) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!serviceId) return;

    async function load() {
      const data = await appointmentsApi.getByService(serviceId);

      setClients(data);

      setLoading(false);
    }

    load();
  }, [serviceId]);

  async function removeClient(appointmentId) {
    await appointmentsApi.remove(appointmentId);

    setClients((prev) => prev.filter((c) => c.id !== appointmentId));
  }

  return {
    clients,
    removeClient,
    loading,
  };
}
