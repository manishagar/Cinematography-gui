import axios from "axios";
import { format } from "date-fns";

const RAW_BASE_URL =
  window._env_?.API_BASE_URL ||
  import.meta.env.VITE_BASE_URL_API;

if (!RAW_BASE_URL) {
  throw new Error(
    "API base URL is not defined. Check env-config.js or VITE_BASE_URL_API."
  );
}

const base = new URL(RAW_BASE_URL);
base.port = "";

export const CLEAN_BASE_URL = base.origin;

const api = axios.create({
  baseURL: CLEAN_BASE_URL,
});

function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    console.warn("Invalid JWT:", error.message);
    return null;
  }
}

api.interceptors.request.use(
  (config) => {
    const token =
      sessionStorage.getItem("svAdminToken") ||
      localStorage.getItem("authToken");
    const method = (config.method || "get").toUpperCase();
    const target = new URL(config.url || "", config.baseURL || CLEAN_BASE_URL);
    const isPublicAuthRequest = target.origin === new URL(CLEAN_BASE_URL).origin && (
      (method === "GET" && target.pathname === "/admin/users/admin/login") ||
      (method === "PUT" && target.pathname === "/admin/users/admin/user/changeExpiredPassword")
    );

    if (isPublicAuthRequest) {
      if (typeof config.headers?.delete === "function") {
        config.headers.delete("Authorization");
      } else if (config.headers) {
        delete config.headers.Authorization;
        delete config.headers.authorization;
      }
      return config;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (token && config.method) {
      const userData = decodeToken(token);
      const method = config.method.toUpperCase();

      if (userData?.username && (method === "POST" || method === "PUT")) {
        if (typeof config.data === "string") {
          config.data = JSON.parse(config.data);
        }

        config.data ||= {};

        if (method === "POST") {
          config.data.createdBy = userData.username;
          config.data.createdAt = format(
            new Date(),
            "yyyy-MM-dd'T'HH:mm:ss"
          );
        } else {
          config.data.modifiedBy = userData.username;
          config.data.modifiedAt = format(
            new Date(),
            "yyyy-MM-dd'T'HH:mm:ss"
          );
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
