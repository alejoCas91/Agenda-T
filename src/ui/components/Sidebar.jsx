import { Link } from "react-router-dom";

export default function Sidebar({ open, role }) {
  return (
    <div
      className={`h-screen transition-all duration-300
      ${open ? "w-64" : "w-16"}
      bg-black text-white flex flex-col`}
    >
      <div className="p-4 font-bold">{open ? "AgendaT" : "AT"}</div>

      <nav className="flex flex-col gap-4 p-4">
        <Link to="/dashboard">{open ? "Dashboard" : "D"}</Link>

        {role === "client" && (
          <Link to="/appointments">{open ? "My Courses" : "M"}</Link>
        )}

        {role === "boss" && (
          <>
            <Link to="/services">{open ? "Create Course" : "C"}</Link>

            <Link to="/boss-courses">{open ? "My Courses" : "M"}</Link>
          </>
        )}

        {role === "admin" && (
          <>
            <Link to="/services">{open ? "Services" : "S"}</Link>

            <Link to="/appointments">{open ? "Appointments" : "A"}</Link>

            <Link to="/clients">{open ? "Clients" : "C"}</Link>
          </>
        )}
      </nav>
    </div>
  );
}
