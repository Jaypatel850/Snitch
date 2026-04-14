import axios from "axios";
const baseURL = "/api/auth";
const api = axios.create({ baseURL });
export const register = async (name, email, contact, password) => {
  const response = await api.post("/register", {
    name,
    email,
    password,
    contact,
  });

  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};
