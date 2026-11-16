
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ShreeVaniHeader from "../pages/ShreeVaniHeader";

import "../css/ShreeVani.css";
import "../css/ShreeVaniAdmin.css";

import api from "../utils/axiosConfig";

// Convert username/password into Base64
const encodeBase64 = (value) => {
  const bytes = new TextEncoder().encode(value);

  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
};

const ShreeVaniAdminLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Admin Login API
  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    const trimmedUsername = username.trim();

    if (!trimmedUsername || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Encode credentials
      const encodedUsername = encodeBase64(trimmedUsername);
      const encodedPassword = encodeBase64(password);

      // Step 2: Prepare URL parameters
      const params = new URLSearchParams();

      params.append("username", encodedUsername);
      params.append("password", encodedPassword);

      // Step 3: Spring Boot endpoint
      const url =
        `/admin/users/admin/login?${params.toString()}`;

      // Step 4: Call backend API
      const response = await api.get(url);

      // Step 5: Read API response
      const result = response.data;
      if (!result || typeof result !== "object") {
        throw new Error(
          "Login API returned an unexpected response. Check the Nginx API proxy configuration."
        );
      }

      const status = String(
        result.status || ""
      ).toUpperCase();

      // Step 6: Validate API status
      if (status !== "SUCCESS") {
        const message =
          Array.isArray(result.messages) &&
          result.messages.length > 0
            ? result.messages.join(", ")
            : result.message ||
              "Invalid username or password.";

        throw new Error(message);
      }

      // Step 7: Extract token
      const token = result.data;

      if (
        typeof token !== "string" ||
        !token.trim()
      ) {
        throw new Error(
          "Authentication token was not returned by the server."
        );
      }

      // Step 8: Save token
      sessionStorage.setItem("svAdminToken", token);

      // Step 9: Navigate to dashboard
      navigate("/shree-vani/admin/dashboard", {
        replace: true,
      });

    } catch (err) {
      console.error("Admin login failed:", err);

      const responseData = err.response?.data;

      const messages = responseData?.messages;

      let errorMessage =
        "Unable to sign in. Please try again.";

      if (
        Array.isArray(messages) &&
        messages.length > 0
      ) {
        errorMessage = messages.join(", ");
      } else if (
        typeof responseData?.message === "string"
      ) {
        errorMessage = responseData.message;
      } else if (err.response?.status === 401) {
        errorMessage = "Invalid username or password.";
      } else if (err.response?.status === 403) {
        errorMessage = "Access denied.";
      } else if (err.response?.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (err.request) {
        errorMessage =
          "Unable to connect to the backend server.";
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sv-page">
      <ShreeVaniHeader />

      <main className="sv-admin-login-page">
        <div className="sv-admin-login-card">

          {/* Logo */}
          <div className="sv-admin-login-brand">
            <img
              src="/images/Logo.png"
              alt="Shree Vani Jagat"
            />

            <span>SHREE VANI JAGAT</span>
          </div>

          {/* Title */}
          <h1>Admin Login</h1>

          <p className="sv-admin-login-subtitle">
            Sign in to manage your website.
          </p>

          {/* Login Form */}
          <form onSubmit={handleLogin}>

            {/* Username */}
            <label htmlFor="sv-admin-username">
              Username
            </label>

            <input
              id="sv-admin-username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="Enter username"
              disabled={loading}
              required
            />

            {/* Password */}
            <label htmlFor="sv-admin-password">
              Password
            </label>

            <div className="sv-admin-password-field">
              <input
                id="sv-admin-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                autoComplete="current-password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter password"
                disabled={loading}
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Error */}
            {error && (
              <p
                role="alert"
                className="sv-admin-login-error"
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              className="sv-admin-login-submit"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>

          </form>

          {/* Back */}
          <Link
            to="/shree-vani"
            className="sv-admin-back-link"
          >
            ← Back to Home
          </Link>

        </div>
      </main>
    </div>
  );
};

export default ShreeVaniAdminLogin;
