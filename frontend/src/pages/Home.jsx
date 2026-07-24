import React from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <p>Loading</p>;
  }
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div className="h-screen">
      <Navbar />
      <div className="h-100 flex flex-col items-center justify-center">
        <h1
          className="font-bold text-center"
          style={{ fontSize: "33vh", lineHeight: 1 }}
        >
          Teamflow
        </h1>
      </div>
    </div>
  );
};

export default Home;
