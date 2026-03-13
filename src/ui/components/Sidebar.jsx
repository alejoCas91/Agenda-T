import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function SidebarItem({ to, label, open }) {
  return (
    <Link
      to={to}
      className="hover:bg-[#9C1C22] rounded px-3 py-2 transition-all"
    >
      {open ? label : label.charAt(0)}
    </Link>
  );
}

export default function Sidebar({ open, role }) {
  return (
    <div
      className={`
      ${open ? "w-64" : "w-16"}
      bg-[#7A0C12] text-white h-screen
      transition-all duration-300
      flex flex-col
      overflow-hidden
      `}
    >

      <div className="flex items-center gap-3 p-4">
        <img src={logo} className="w-8 rounded-full" />

        {open && <span className="text-lg font-semibold">AgendaT</span>}
      </div>

      <nav className="flex flex-col gap-2 px-3">
        <SidebarItem to="/dashboard" label="Dashboard" open={open} />

        {role === "admin" && (
          <>
            <SidebarItem to="/services" label="Services" open={open} />

            <SidebarItem to="/clients" label="Clients" open={open} />

            <SidebarItem to="/appointments" label="Reservations" open={open} />
          </>
        )}

        {role === "boss" && (
          <>
            <SidebarItem to="/services" label="Create Course" open={open} />

            <SidebarItem to="/boss-courses" label="My Courses" open={open} />
          </>
        )}

        {role === "client" && (
          <>
            <SidebarItem to="/services" label="Courses" open={open} />

            <SidebarItem to="/appointments" label="My Courses" open={open} />
          </>
        )}
      </nav>
    </div>
  );
}
