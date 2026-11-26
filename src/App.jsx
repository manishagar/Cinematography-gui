import {
  Navigate,
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";

import EntryPage from "./pages/EntryPage";
import HomePage from "./components/HomePage";
import AdminLoginPage from "./components/AdminLoginPage";
import AdminDashboardPage from "./components/AdminDashboardPage";

import ShreeVani from "./pages/ShreeVani";
import ShreeVaniServices from "./pages/ShreeVaniServices";
import ShreeVaniContact from "./pages/ShreeVaniContact";

import ShreeVaniAdminLogin from "./components/ShreeVaniAdminLogin.jsx";
import ShreeVaniAdminDashboard from "./pages/ShreeVaniAdminDashboard";

import BannerManagement from "./pages/BannerManagement";
import ChangePassword from "./components/ChangePassword.jsx";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Entry Page */}
        <Route
          path="/"
          element={<EntryPage />}
        />

        {/* Shree Vani */}
        <Route
          path="/shree-vani"
          element={<ShreeVani />}
        />

        {/* Vinayak Cinematography */}
        <Route
          path="/vinayak-cinematography"
          element={<HomePage />}
        />

        {/* Cinematography Admin Login */}
        <Route
          path="/admin"
          element={<AdminLoginPage />}
        />

        {/* Cinematography Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboardPage />}
        />

        {/* Shree Vani Services */}
        <Route
          path="/shree-vani/services"
          element={<ShreeVaniServices />}
        />

        {/* Shree Vani Contact */}
        <Route
          path="/shree-vani/contact"
          element={<ShreeVaniContact />}
        />

        {/* Shree Vani Admin Login */}
        <Route
          path="/shree-vani/admin/login"
          element={<ShreeVaniAdminLogin />}
        />

        {/* Shree Vani Admin Dashboard */}
        <Route
          path="/shree-vani/admin/dashboard"
          element={<ShreeVaniAdminDashboard />}
        />

        {/* Banner Management */}
        <Route
          path="/shree-vani/admin/banner"
          element={<BannerManagement />}
        />

        {/* Normal Change Password */}
        <Route
          path="/shree-vani/admin/settings/change-password"
          element={<ChangePassword />}
        />

        {/* Expired Password - NEW ROUTE */}
        <Route
          path="/shree-vani/admin/expired-password"
          element={<ChangePassword />}
        />

        {/* Default Route */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>

  );
}