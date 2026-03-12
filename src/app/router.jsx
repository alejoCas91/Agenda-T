import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import DashboardLayout from "../ui/layouts/DashboardLayout";

import DashboardPage from "../pages/dashboard/DashboardPage";
import ServicesPage from "../pages/services/ServicesPage";
import AppointmentsPage from "../pages/appointments/AppointmentsPage";
import ClientsPage from "../pages/clients/ClientsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Route
        path="/services"
        element={
          <ProtectRouter>
            <ServicesPage />
          </ProtectRouter>
        }
      />

      <Route
        path="/appointments"
        element={
          <ProtectRouter>
            <AppointmentsPage />
          </ProtectRouter>
        }
      />

      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
