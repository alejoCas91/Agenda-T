import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import useRole from "../../hooks/useRole";

export default function DashboardLayout() {
  const [open, setOpen] = useState(true);

  const { role, loading } = useRole();

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  const theme = {
    admin: "bg-gray-700 text-black",
    boss: "bg-gray-200",
    client: "bg-sky-100",
  };

  return (
    <div className={`flex h-screen ${theme[role]}`}>

      <Sidebar open={open} role={role} />

      <div className="flex flex-col flex-1">
        <Topbar toggleSidebar={() => setOpen(!open)} />

        <main className="p-6 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
