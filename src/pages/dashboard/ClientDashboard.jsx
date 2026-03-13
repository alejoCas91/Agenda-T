import useStats from "../../hooks/useStats";

export default function ClientDashboard() {
  const stats = useStats();

  if (!stats) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">My Dashboard</h1>

      <div className="border rounded-xl p-4 w-64">
        <p>My Courses</p>

        <h2 className="text-3xl font-bold">{stats.myBookings}</h2>
      </div>
    </div>
  );
}
