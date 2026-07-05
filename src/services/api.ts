import axios from "axios";
import { auth } from "../firebase.config";

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