import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import useTheme from "../../hooks/useTheme";
import useRole from "../../hooks/useRole";

export default function DashboardLayout() {
  const [open, setOpen] = useState(true);

  const theme = useTheme();
  const { role } = useRole();

  function toggleSidebar() {
    setOpen(!open);
  }

  return (
    <div className={`flex h-screen ${theme.bg}`}>
      <Sidebar open={open} role={role} />

      <div className="flex flex-col flex-1">
        <Topbar toggleSidebar={toggleSidebar} />

        <div className="p-6 overflow-y-auto flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
