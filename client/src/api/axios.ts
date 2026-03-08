import axios from "axios";
import type { Register } from "../types/types";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});


export const register = (payload: Register) => {
  return api.post("/auth/register", payload, {
    headers: { "Content-Type": "application/json" },
  });
};
