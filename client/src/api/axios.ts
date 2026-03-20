import axios from "axios";
import type { LoginState, RegisterState } from "../types/types";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

export const register = (payload: RegisterState) => {
  return api.post("/auth/register", payload, {
    headers: { "Content-Type": "application/json" },
  });
};

export const loginUser = (payload: LoginState) => {
  return api.post("/auth/login", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchEvents = async (signal: any) => {
  return api.get("/events", signal);
};

export const fetchFests = (signal : any) => {
  return api.get("/fests",signal)
}

export const fetchClubs = (signal : any) => {
  return api.get("/clubs",signal)
} 

export const fetchFest = (id : any , signal : any) => {
  return api.get(`/fests/${id}` , signal)
}
