import useStats from "../../hooks/useStats";

export default function AdminDashboard() {
  const stats = useStats();

  if (!stats) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="border rounded-xl p-4">
          <p>Total Courses</p>
          <h2 className="text-3xl font-bold">{stats.courses}</h2>
        </div>

        <div className="border rounded-xl p-4">
          <p>Total Reservations</p>
          <h2 className="text-3xl font-bold">{stats.appointments}</h2>
        </div>

        <div className="border rounded-xl p-4">
          <p>Total Clients</p>
          <h2 className="text-3xl font-bold">{stats.clients}</h2>
        </div>
      </div>
    </div>
  );
}
