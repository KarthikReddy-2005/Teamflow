import { useContext, useEffect, useState, createContext } from "react";
import { verifySession } from "../services/authService";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await verifySession();
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  const login = (userData) => setUser(userData);
  const register = (userData) => setUser(userData);
  const logout = () => setUser(null);
  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
