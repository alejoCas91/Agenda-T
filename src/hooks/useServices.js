import { useEffect, useState } from "react";
import { servicesApi } from "../data/apis/servicesApi";
import { supabase } from "../lib/supabase";

export default function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await servicesApi.getAll();
        setServices(data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  async function createService(service) {
    const data = await servicesApi.create(service);

    setServices((prev) => [...prev, ...data]);
  }

  async function deleteService(id) {
    const { data } = await supabase
      .from("appointments")
      .select("id")
      .eq("service_id", id);

    if (data.length > 0) {
      throw new Error("Service has appointments");
    }

    await servicesApi.remove(id);

    setServices((prev) => prev.filter((s) => s.id !== id));
  }

  return {
    services,
    createService,
    deleteService,
    loading,
    error,
  };
}
