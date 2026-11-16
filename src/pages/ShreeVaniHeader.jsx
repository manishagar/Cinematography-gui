
import React, { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import "../css/ShreeVani.css";

const ShreeVaniHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [servicesOpen, setServicesOpen] = useState(false);

  const isServicesActive =
    location.pathname.startsWith("/shree-vani/services");

  const closeMenu = () => setServicesOpen(false);

  return (
    <header className="sv-header">
      {/* First row - Logo and title */}
      <div className="sv-header-top">
        <img
          src="/images/Logo.png"
          alt="Shree Vani Jagat Logo"
          className="sv-header-logo"
          onClick={() => navigate("/shree-vani")}
        />

        <div className="sv-header-title">
          <h1>Shree Vani Jagat</h1>
          <p>Welcome to Shree Vani Jagat</p>
        </div>

        <Link to="/shree-vani/admin/login" className="sv-header-admin-login">
          <span aria-hidden="true">🔐</span>
          <span>Admin Login</span>
        </Link>
      </div>

      {/* Second row - Navigation */}
      <nav className="sv-navbar" aria-label="Main navigation">
        <NavLink
          to="/shree-vani"
          end
          className={({ isActive }) =>
            isActive ? "sv-nav-link active" : "sv-nav-link"
          }
        >
          HOME
        </NavLink>

        {/* Services dropdown */}
        <div
          className="sv-dropdown"
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={closeMenu}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              closeMenu();
            }
          }}
        >
          <button
            type="button"
            className={
              isServicesActive
                ? "sv-nav-link sv-dropdown-toggle active"
                : "sv-nav-link sv-dropdown-toggle"
            }
            aria-expanded={servicesOpen}
            aria-controls="sv-services-menu"
            onClick={() => setServicesOpen(!servicesOpen)}
          >
            Services <span aria-hidden="true">▾</span>
          </button>

          {servicesOpen && (
            <div
              id="sv-services-menu"
              className="sv-dropdown-menu"
            >
              <NavLink
                to="/shree-vani/services/religious"
                onClick={closeMenu}
                className="sv-dropdown-item"
              >
                Religious
              </NavLink>

              <NavLink
                to="/shree-vani/services/familial"
                onClick={closeMenu}
                className="sv-dropdown-item"
              >
                Familial
              </NavLink>

              <NavLink
                to="/shree-vani/services/social"
                onClick={closeMenu}
                className="sv-dropdown-item"
              >
                Social
              </NavLink>
            </div>
          )}
        </div>

        <NavLink
          to="/shree-vani/contact"
          className={({ isActive }) =>
            isActive ? "sv-nav-link active" : "sv-nav-link"
          }
        >
          Contact
        </NavLink>
      </nav>
    </header>
  );
};

export default ShreeVaniHeader;
