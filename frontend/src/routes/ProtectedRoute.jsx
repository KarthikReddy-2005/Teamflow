import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../services/authService";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function verifyUser() {
      try {
        const data = await getUser();
        setUser(data);
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }
    verifyUser();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet context={user} />;
};

export default ProtectedRoute;
