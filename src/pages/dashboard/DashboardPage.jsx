import useRole from "../../hooks/useRole";

import AdminDashboard from "./AdminDashboard";
import BossDashboard from "./BossDashboard";
import ClientDashboard from "./ClientDashboard";

export default function DashboardPage() {
  const { role, loading } = useRole();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (role === "admin") {
    return <AdminDashboard />;
  }

  if (role === "boss") {
    return <BossDashboard />;
  }

  return <ClientDashboard />;
}
