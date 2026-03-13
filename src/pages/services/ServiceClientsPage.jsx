import { useParams } from "react-router-dom";
import useCourseClients from "../../hooks/useCourseClients";

export default function ServiceClientsPage() {
  const { id } = useParams();

  const { clients, removeClient, loading } = useCourseClients(id);

  if (loading) {
    return <div>Loading clients...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Clients in Course</h1>

      {clients.length === 0 && <p>No clients enrolled</p>}

      {clients.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border p-3 rounded-lg"
        >
          <div>
            <p className="font-semibold">{item.clients.name}</p>

            <p className="text-sm text-gray-500">{item.clients.email}</p>
          </div>

          <button
            onClick={() => removeClient(item.id)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
