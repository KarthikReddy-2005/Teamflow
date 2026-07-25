import { useContext, useEffect, useState, createContext } from "react";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifySession,
} from "../services/authService";

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

  const refresh = async () => {
    const user = await verifySession();
    setUser(user);
  };
  const login = async (credentials) => {
    const user = await loginUser(credentials);
    setUser(user);
    return user;
  };

  const register = async (credentials) => {
    const user = await registerUser(credentials);
    setUser(user);
    return user;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const value = {
    user,
    loading,
    refresh,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
