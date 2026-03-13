import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { servicesApi } from "../data/apis/servicesApi";

export default function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const data = await servicesApi.getAll();

      setServices(data || []);

      setLoading(false);
    }

    init();

    const channel = supabase
      .channel("services-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "services",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setServices((prev) => {
              const exists = prev.find((s) => s.id === payload.new.id);

              if (exists) return prev;

              return [...prev, payload.new];
            });
          }

          if (payload.eventType === "UPDATE") {
            setServices((prev) =>
              prev.map((s) => (s.id === payload.new.id ? payload.new : s)),
            );
          }

          if (payload.eventType === "DELETE") {
            setServices((prev) => prev.filter((s) => s.id !== payload.old.id));
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function createService(service) {
    const { data: userData } = await supabase.auth.getUser();

    const user = userData.user;

    const data = await servicesApi.create({
      ...service,
      user_id: user.id,
    });

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

  async function approveService(id) {
    const data = await servicesApi.approve(id);

    setServices((prev) =>
      prev.map((service) => (service.id === id ? data[0] : service)),
    );
  }

  return {
    services,
    createService,
    deleteService,
    approveService,
    loading,
  };
}
