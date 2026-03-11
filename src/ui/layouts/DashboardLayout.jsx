import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import { Outlet } from "react-router-dom"

export default function DashboardLayout() {

  return (
    <div className="flex">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
        <Topbar/>
        <main className="p-6 bg-gray-50 min-h-screen">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}