import { useEffect, useState } from "react";
import { servicesApi } from "../data/apis/servicesApi";

export default function useServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function fetchServices() {
      try {
        const data = await servicesApi.getAll();
        if (mounted) {
          setServices(data || []);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchServices();

    return () => {
      mounted = false;
    };
  }, []);

  async function createService(service) {
    try {
      await servicesApi.create(service);
      // Recargar después de crear
      const data = await servicesApi.getAll();
      setServices(data || []);
    } catch (error) {
      console.error(error);
    }
  }

  return { services, createService };
}
