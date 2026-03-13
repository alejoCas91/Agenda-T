import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectRouter from "./ProtectRouter";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import DashboardLayout from "../ui/layouts/DashboardLayout";

import DashboardPage from "../pages/dashboard/DashboardPage";
import ServicesPage from "../pages/services/ServicesPage";
import AppointmentsPage from "../pages/appointments/AppointmentsPage";
import ClientsPage from "../pages/clients/ClientsPage";

import BossCoursesPage from "../pages/boss/BossCoursesPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          element={
            <ProtectRouter>
              <DashboardLayout />
            </ProtectRouter>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/services" element={<ServicesPage />} />

          <Route path="/appointments" element={<AppointmentsPage />} />

          <Route path="/clients" element={<ClientsPage />} />

          <Route path="/boss-courses" element={<BossCoursesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
