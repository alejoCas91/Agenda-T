import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import LoginPage from "../pages/auth/LoginPage"
import RegisterPage from "../pages/auth/RegisterPage"
import DashboardPage from "../pages/dashboard/DashboardPage"

import ClientsPage from "../pages/clients/ClientsPage"
import ServicesPage from "../pages/services/ServicesPage"
import AppointmentsPage from "../pages/appointments/AppointmentsPage"
import BossesPage from "../pages/bosses/BossesPage"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/clients" element={<ClientsPage />} />
        <Route path="/dashboard/services" element={<ServicesPage />} />
        <Route path="/dashboard/appointments" element={<AppointmentsPage />} />
        <Route path="/dashboard/bosses" element={<BossesPage />} />

        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  )
}