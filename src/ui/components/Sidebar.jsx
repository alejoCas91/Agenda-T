import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Sidebar({ open, role }) {
  return (
    <div
      className={`
      ${open ? "w-64" : "w-16"}
      bg-[#7A0C12] text-white h-screen
      transition-all duration-300
      flex flex-col`}
    >
      <div className="flex items-center gap-3 p-4">
        <img src={logo} className="w-8 rounded-full" />

        {open && <span className="text-lg font-semibold">AgendaT</span>}
      </div>

      <nav className="flex flex-col gap-2 px-3">
        <Link to="/dashboard" className="hover:bg-[#9C1C22] rounded px-3 py-2">
          Dashboard
        </Link>

        {role === "admin" && (
          <>
            <Link
              to="/services"
              className="hover:bg-[#9C1C22] rounded px-3 py-2"
            >
              Services
            </Link>

            <Link
              to="/clients"
              className="hover:bg-[#9C1C22] rounded px-3 py-2"
            >
              Clients
            </Link>

            <Link
              to="/appointments"
              className="hover:bg-[#9C1C22] rounded px-3 py-2"
            >
              Reservations
            </Link>
          </>
        )}

        {role === "boss" && (
          <>
            <Link
              to="/services"
              className="hover:bg-[#9C1C22] rounded px-3 py-2"
            >
              Create Course
            </Link>

            <Link
              to="/boss-courses"
              className="hover:bg-[#9C1C22] rounded px-3 py-2"
            >
              My Courses
            </Link>
          </>
        )}

        {role === "client" && (
          <>
            <Link
              to="/services"
              className="hover:bg-[#9C1C22] rounded px-3 py-2"
            >
              Courses
            </Link>

            <Link
              to="/appointments"
              className="hover:bg-[#9C1C22] rounded px-3 py-2"
            >
              My Courses
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}
