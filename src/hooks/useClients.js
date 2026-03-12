import { useEffect, useState } from "react";
import { clientsApi } from "../data/apis/clientsApi";
import { supabase } from "../lib/supabase";

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
    const { data } = await supabase
      .from("appointments")
      .select("id")
      .eq("client_id", id);

    if (data.length > 0) {
      throw new Error("Client has appointments");
    }

    await clientsApi.remove(id);

    setClients((prev) => prev.filter((c) => c.id !== id));
  }

  return { clients, createClient, deleteClient };
}
