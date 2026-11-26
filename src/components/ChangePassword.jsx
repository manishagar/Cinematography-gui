import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  KeyRound,
  X,
  ChevronRight, ChevronDown, LayoutDashboard, Image, Folder, FileText, Users, ChartNoAxesColumn, Settings, LogOut, Menu
} from "lucide-react";
import api from "../utils/axiosConfig";
import "../css/ChangePassword.css";
import "../css/PasswordExpiry.css";
import "../css/ChangePasswordSidebar.css";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/shree-vani/admin/dashboard" },
  { label: "Banner Management", icon: Image, path: "/shree-vani/admin/banner" },
  { label: "Folder Management", icon: Folder, path: "/shree-vani/admin/folders" },
  { label: "File Management", icon: FileText, path: "/shree-vani/admin/files" },
  { label: "Reports", icon: ChartNoAxesColumn, path: "/shree-vani/admin/reports" }
];

const initialForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: ""
};

const initialVisibility = {
  currentPassword: false,
  newPassword: false,
  confirmPassword: false
};

export default function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const isExpiredPassword = location.pathname === "/shree-vani/admin/expired-password";
  const expiredUsername = location.state?.username?.trim() || "";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const logoutInProgress = useRef(false);
  useEffect(() => {
    if (isExpiredPassword ? !expiredUsername : !sessionStorage.getItem("svAdminToken")) {
      navigate("/shree-vani/admin/login", { replace: true });
    }
  }, [navigate, isExpiredPassword, expiredUsername]);

  const logout = async () => {
    if (logoutInProgress.current) return;
    logoutInProgress.current = true;
    setLoggingOut(true);
    try {
      const token = sessionStorage.getItem("svAdminToken")?.trim().replace(/^Bearer\s+/i, "");
      if (token) {
        await api.post("/admin/users/admin/logout", null, {
          headers: { Authorization: `Bearer ${token}` }, timeout: 10000
        });
      }
    } catch (error) {
      console.warn("Server logout failed; clearing local session.");
    } finally {
      sessionStorage.removeItem("svAdminToken");
      if (api.defaults?.headers?.common) {
        delete api.defaults.headers.common.Authorization;
        delete api.defaults.headers.common.authorization;
      }
      navigate("/shree-vani/admin/login", { replace: true });
    }
  };

  const goTo = (path) => {
    setSidebarOpen(false);
    navigate(path);
  };

  const [form, setForm] = useState(initialForm);
  const [visible, setVisible] = useState(initialVisibility);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const requirements = [
    {
      label: "At least 8 characters long",
      valid: form.newPassword.length >= 8
    },
    {
      label: "At least one uppercase letter (A-Z)",
      valid: /[A-Z]/.test(form.newPassword)
    },
    {
      label: "At least one lowercase letter (a-z)",
      valid: /[a-z]/.test(form.newPassword)
    },
    {
      label: "At least one number (0-9)",
      valid: /\d/.test(form.newPassword)
    },
    {
      label: "At least one special character",
      valid: /[^A-Za-z0-9]/.test(form.newPassword)
    }
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));

    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));

    setMessage(null);
  };

  const toggleVisibility = (field) => {
    setVisible(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Only validate the session locally. Password rules are validated by Spring Boot.
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrors({});
    setMessage(null);

    try {
      const token = sessionStorage.getItem("svAdminToken")
        ?.replace(/^Bearer\s+/i, "").trim();
      if (!isExpiredPassword && !token) {
        navigate("/shree-vani/admin/login", { replace: true });
        return;
      }

      // Adjust this key to match the one your login page actually stores.
      // For stronger security, Spring Boot should derive username from the JWT.
     const username = isExpiredPassword ? expiredUsername : sessionStorage.getItem("svAdminUsername")?.trim();
      if (!username) {
        setMessage({ type: "error", text: "Username is missing from the login session. Please sign in again." });
        return;
      }

      const response = await api.put(
        isExpiredPassword ? "/admin/users/admin/user/changeExpiredPassword" : "/admin/users/admin/user/changePassword",
        {
          username,
          currentPassword: form.currentPassword,
          password: form.newPassword,
          confirmPassword: form.confirmPassword
          // salt, hash and modifiedDt are generated by the backend.
        },
        isExpiredPassword ? {} : { headers: { Authorization: `Bearer ${token}` } }
      );

      if (String(response.data?.status).toLowerCase() === "success") {
        setForm(initialForm);
        setVisible(initialVisibility);
        setErrors({});
        sessionStorage.removeItem("svAdminToken");
        sessionStorage.removeItem("svAdminUsername");
        navigate("/shree-vani/admin/login", { replace: true, state: { successMessage: "Password changed successfully. Please sign in with your new password." } });
      } else {
        processApiErrors(response.data);
      }
    } catch (error) {
      if (!isExpiredPassword && error.response?.status === 401) {
        sessionStorage.removeItem("svAdminToken");
        navigate("/shree-vani/admin/login", { replace: true });
        return;
      }
      processApiErrors(error.response?.data, error.message);
    } finally {
      setLoading(false);
    }
  };

  const processApiErrors = (data, fallback) => {
    const messages = Array.isArray(data?.messages)
      ? data.messages
      : data?.message ? [data.message] : [];
    const fieldErrors = {};
    const generalErrors = [];
    const fieldMap = {
      currentpassword: "currentPassword",
      password: "newPassword",
      newpassword: "newPassword",
      confirmpassword: "confirmPassword"
    };

    messages.forEach((entry) => {
      if (typeof entry !== "string") return;
      const cleaned = entry.trim();
      if (!cleaned || /^api executed with errors!?$/i.test(cleaned)) return;
      const separator = cleaned.indexOf(":");
      if (separator > 0) {
        const backendField = cleaned.slice(0, separator).trim().toLowerCase();
        const uiField = fieldMap[backendField];
        if (uiField) {
          const detail = cleaned.slice(separator + 1).trim();
          // Keep distinct backend messages, but never repeat the same validation.
          const existing = fieldErrors[uiField]
            ? fieldErrors[uiField].split("; ")
            : [];
          if (detail && !existing.some((msg) => msg.toLowerCase() === detail.toLowerCase())) {
            fieldErrors[uiField] = [...existing, detail].join("; ");
          }
          return;
        }
      }
      generalErrors.push(cleaned);
    });

    setErrors(fieldErrors);
    if (generalErrors.length) {
      setMessage({ type: "error", text: generalErrors.join(". ") });
    } else if (!Object.keys(fieldErrors).length) {
      setMessage({ type: "error", text: fallback || "Unable to change password. Please try again." });
    }
  };

  const handleCancel = () => {
    navigate(isExpiredPassword ? "/shree-vani/admin/login" : "/shree-vani/admin/dashboard");
  };

  const renderPasswordField = (label, name) => (
    <div className="cp-field" key={name}>
      <label htmlFor={name}>
        {label} <span className="cp-required">*</span>
      </label>

      <div className={
        `cp-input-wrap ${errors[name] ? "cp-invalid" : ""}`
      }>
        <input
          id={name}
          name={name}
          type={visible[name] ? "text" : "password"}
          value={form[name]}
          onChange={handleChange}
          placeholder={`Enter ${label.toLowerCase()}`}
          autoComplete={
            name === "currentPassword"
              ? "current-password"
              : "new-password"
          }
          aria-invalid={Boolean(errors[name])}
          aria-describedby={
            errors[name] ? `${name}-error` : undefined
          }
        />

        <button
          type="button"
          className="cp-eye-button"
          onClick={() => toggleVisibility(name)}
          aria-label={
            visible[name] ? `Hide ${label}` : `Show ${label}`
          }
        >
          {visible[name]
            ? <EyeOff size={20} />
            : <Eye size={20} />}
        </button>
      </div>

      {errors[name] && (
        <span
          className="cp-field-error"
          id={`${name}-error`}
          role="alert"
        >
          {errors[name]}
        </span>
      )}
    </div>
  );

  return (
    <div className={`svcp-shell ${isExpiredPassword ? "svcp-expired-mode" : ""}`}>
      {sidebarOpen && <button type="button" className="svcp-backdrop" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
      {!isExpiredPassword && <aside className={`svcp-sidebar ${sidebarOpen ? "svcp-sidebar-open" : ""}`} aria-label="Admin sidebar">
        <div className="svcp-brand">
          <img src="/images/Logo.png" alt="Shree Vani logo" />
          <div><strong>Shree Vani</strong><small>Admin Portal</small></div>
        </div>
        <nav className="svcp-nav" aria-label="Admin navigation">
          {navigation.map(({ label, icon: Icon, path }) => (
            <button key={path} type="button" className="svcp-nav-item" onClick={() => goTo(path)}>
              <Icon size={21} /><span>{label}</span>
            </button>
          ))}
          <button type="button" className="svcp-nav-item svcp-settings" aria-expanded={settingsOpen} onClick={() => setSettingsOpen(v => !v)}>
            <Settings size={21} /><span>Settings</span>{settingsOpen ? <ChevronDown size={17} /> : <ChevronRight size={17} />}
          </button>
          {settingsOpen && <div className="svcp-submenu">
            <button type="button" onClick={() => goTo("/shree-vani/admin/settings/profile")}>User Settings</button>
            <button type="button" className="svcp-sub-active" aria-current="page" onClick={() => setSidebarOpen(false)}><LockKeyhole size={17} /> Change Password</button>
          </div>}
        </nav>
        <button type="button" className="svcp-logout" onClick={logout} disabled={loggingOut}>
          <LogOut size={21} /> {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </aside>}
      <div className="svcp-main">
    <div className="cp-page">
      {!isExpiredPassword && <div className="cp-breadcrumb">
        <button
          type="button"
          onClick={() =>
            navigate("/shree-vani/admin/dashboard")
          }
        >
          Home
        </button>
        <ChevronRight size={15} />
        <span>Settings</span>
        <ChevronRight size={15} />
        <strong>Change Password</strong>
      </div>}

      <div className="cp-card">
        <div className="cp-heading">
          <div className="cp-heading-icon">
            <LockKeyhole size={34} />
          </div>

          <div>
            <h1>Change Password</h1>
            <p>
              Update your account password to keep it secure.
            </p>
          </div>
        </div>

        {isExpiredPassword && <>
          <div className="cp-expired-alert" role="alert">Your password has expired. Please change your password to continue.</div>
          <div className="cp-field"><label htmlFor="expiredUsername">Username</label><div className="cp-input-wrap"><input id="expiredUsername" value={expiredUsername} readOnly /></div></div>
        </>}
        {message && (
          <div
            className={`cp-alert cp-alert-${message.type}`}
            role="alert"
          >
            {message.type === "success"
              ? <CheckCircle2 size={20} />
              : <XCircle size={20} />}

            <span>{message.text}</span>

            <button
              type="button"
              onClick={() => setMessage(null)}
              aria-label="Dismiss message"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <div className="cp-content">
          <form
            className="cp-form"
            onSubmit={handleSubmit}
            noValidate
          >
            {renderPasswordField(
              "Current Password",
              "currentPassword"
            )}

            {renderPasswordField(
              "New Password",
              "newPassword"
            )}

            {renderPasswordField(
              "Confirm New Password",
              "confirmPassword"
            )}

            <div className="cp-actions">
              <button
                type="submit"
                className="cp-submit"
                disabled={loading}
              >
                <KeyRound size={19} />
                {loading
                  ? "Changing Password..."
                  : "Change Password"}
              </button>

              <button
                type="button"
                className="cp-cancel"
                onClick={handleCancel}
                disabled={loading}
              >
                <X size={19} />
                Cancel
              </button>
            </div>
          </form>

          <aside className="cp-requirements">
            <div className="cp-requirements-heading">
              <ShieldCheck size={29} />
              <h2>Password Requirements</h2>
            </div>

            <div className="cp-requirements-list">
              {requirements.map((item) => (
                <div
                  className="cp-requirement"
                  key={item.label}
                >
                  {item.valid ? (
                    <CheckCircle2
                      size={20}
                      className="cp-valid"
                    />
                  ) : (
                    <span className="cp-neutral-check">
                      <CheckCircle2 size={20} />
                    </span>
                  )}

                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
}
