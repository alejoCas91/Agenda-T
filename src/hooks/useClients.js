import { useEffect, useState } from "react";
import { clientsApi } from "../data/apis/clientsApi";

export default function useClients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await clientsApi.getAll();
      setClients(data || []);
    }

    load();
  }, []);

  async function createClient(client) {
    const data = await clientsApi.create(client);

    setClients((prev) => [...prev, ...data]);
  }

  async function deleteClient(id) {
    await clientsApi.remove(id);

    setClients((prev) => prev.filter((c) => c.id !== id));
  }

  return { clients, createClient, deleteClient };
}
