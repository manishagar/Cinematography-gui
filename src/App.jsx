import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom'
import EntryPage from './pages/EntryPage'
import HomePage from './components/HomePage'
import AdminLoginPage from './components/AdminLoginPage'
import AdminDashboardPage from './components/AdminDashboardPage'
import ShreeVani from "./pages/ShreeVani";
import ShreeVaniServices from "./pages/ShreeVaniServices";
import ShreeVaniContact from "./pages/ShreeVaniContact";
import ShreeVaniAdminLogin from "./components/ShreeVaniAdminLogin.jsx";
import ShreeVaniAdminDashboard from "./pages/ShreeVaniAdminDashboard";
import BannerManagement from './pages/BannerManagement'
import ChangePassword from './components/ChangePassword.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/shree-vani" element={<ShreeVani />} />
        <Route path="/vinayak-cinematography" element={<HomePage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/shree-vani/services" element={<ShreeVaniServices />} />
        <Route path="/shree-vani/contact" element={<ShreeVaniContact />} />
        <Route path="/shree-vani/admin/login" element={<ShreeVaniAdminLogin />} />
        <Route
          path="/shree-vani/admin/dashboard"
          element={<ShreeVaniAdminDashboard />}
        />
        <Route path="/shree-vani/admin/banner" element={<BannerManagement />} />
        <Route path = "/shree-vani/admin/settings/change-password" element={<ChangePassword/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}