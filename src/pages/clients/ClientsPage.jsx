import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadClients() {
    const { data } = await supabase.from("clients").select("*");

    setClients(data || []);
    setLoading(false);
  }

  useEffect(() => {
    async function fetchClients() {
      await loadClients();
    }
    fetchClients();
  }, []);

  const filtered = clients.filter(
    (client) =>
      client.name?.toLowerCase().includes(search.toLowerCase()) ||
      client.email?.toLowerCase().includes(search.toLowerCase()) ||
      client.phone?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return <div className="p-6">Loading clients...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Clients</h1>

      <input
        type="text"
        placeholder="Search by name, email or phone"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-3 py-2 w-80"
      />

      {filtered.length === 0 && <p>No clients found</p>}

      <div className="flex flex-col gap-3">
        {filtered.map((client) => (
          <div
            key={client.id}
            className="border rounded-lg p-4 flex justify-between"
          >
            <div>
              <p className="font-semibold">{client.name}</p>

              <p className="text-sm text-gray-500">{client.email}</p>

              <p className="text-sm text-gray-500">{client.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
