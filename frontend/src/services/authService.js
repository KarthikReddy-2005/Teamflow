import api from "../api/apiClient";

export const register = async (userData) => {
  const { data } = await api.post("/api/auth/register", userData);
  return data.data;
};

export const login = async (userData) => {
  const { data } = await api.post("/api/auth/login", userData);
  return data.data;
};

export const getUser = async () => {
  const { data } = await api.get("/api/auth/verify");
  return data.data;
};

export const logoutUser = async () => {
  const { data } = await api.post("/api/auth/logout");
  return data.data;
};

// export const register = (userData) =>
//   fetchClient("register", { method: "POST", body: userData });
// export const login = (userData) =>
//     fetchClient("login", { method: "POST", body: userData });
