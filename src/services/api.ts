import axios from "axios";
import { auth } from "../firebase.config";
import { logout } from "../hooks/useAuth";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },

});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();

    config.headers["authorization"] = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  async (response) => response,
  async (error) => {
    if(error.response.status === 401) {
      logout();
    }
  return error;
  }
)