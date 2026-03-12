import useRole from "../../hooks/useRole";

export default function DashboardPage() {
  const role = useRole();

  if (!role) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (role === "admin") {
    return <div className="p-6">Admin Dashboard</div>;
  }

  if (role === "boss") {
    return <div className="p-6">Boss Dashboard</div>;
  }

  return <div className="p-6">Client Dashboard</div>;
}
