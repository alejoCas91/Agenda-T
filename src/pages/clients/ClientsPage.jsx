import { useState } from "react";
import PageHeader from "../../ui/components/PageHeader";
import useClients from "../../hooks/useClients";
import ConfirmDialog from "../../ui/components/ConfirmDialog";

export default function ClientsPage() {
  const { clients, createClient, deleteClient } = useClients();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  async function handleCreate() {
    if (!name || !phone) return;

    await createClient({
      name,
      phone,
      user_id: "00000000-0000-0000-0000-000000000000",
    });

    setName("");
    setPhone("");
  }

  async function handleDelete(){

  await deleteClient(selected)

  setOpen(false)
  setSelected(null)

}

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Clients" description="Manage your business clients" />
      <ConfirmDialog
        open={open}
        onClose={() => {
          setOpen(false);
          setSelected(null);
        }}
        onConfirm={handleDelete}
        title="Delete Client"
        message="Sure?"
      />

      <div className="bg-white border rounded-xl p-6 shadow-sm flex gap-3">
        <input
          className="border rounded-lg px-3 py-2 flex-1"
          placeholder="Client name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border rounded-lg px-3 py-2 flex-1"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          className="bg-black text-white px-4 rounded-lg"
          onClick={handleCreate}
        >
          Add Client
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {clients.map((c) => (
          <div
            key={c.id}
            className="bg-white border rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
                {c.name?.charAt(0)}
              </div>

              <div className="flex flex-col">
                <span className="font-semibold">{c.name}</span>

                <span className="text-sm text-gray-500">{c.phone}</span>
              </div>
            </div>

            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => {
                setSelected(c.id);
                setOpen(true);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
