import { NavLink } from "react-router-dom";
import { LayoutDashboard, BookOpen, Calendar, Users } from "lucide-react";

export default function Sidebar() {
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-2 p-3 rounded-lg transition
    ${isActive ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"}`;

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <h2 className="text-xl font-bold mb-8">AgendaT</h2>
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" className={linkStyle}>
          <LayoutDashboard size={18} />
          Inicio
        </NavLink>

        <NavLink to="/courses" className={linkStyle}>
          <BookOpen size={18} />
          Cursos
        </NavLink>

        <NavLink to="/appointments" className={linkStyle}>
          <Calendar size={18} />
          Citas
        </NavLink>

        <NavLink to="/clients" className={linkStyle}>
          <Users size={18} />
          Clientes
        </NavLink>
      </nav>
    </aside>
  );
}
