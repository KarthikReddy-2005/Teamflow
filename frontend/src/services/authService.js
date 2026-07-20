import api from "../api/apiClient";

export const register = async (userData) => {
  const { data } = await api.post("/register", userData);
  return data;
};

export const login = async (userData) => {
  const { data } = await api.post("/login", userData);
  return data;
};

export const getUserName = async () => {
  const { data } = await api.get("/me");
  return data;
};

// export const register = (userData) =>
//   fetchClient("register", { method: "POST", body: userData });
// export const login = (userData) =>
//     fetchClient("login", { method: "POST", body: userData });
