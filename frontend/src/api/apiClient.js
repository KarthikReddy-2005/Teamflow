import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export default api;

// const fetchClient = async (route, options) => {
//   const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${route}`, {
//     method: options.method,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(options.body),
//   });
//   const result = await response.json();
//   return {
//     ok: response.ok,
//     data: result,
//   };
// };
