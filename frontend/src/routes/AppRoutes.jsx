import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Teams from "../pages/Teams";
import Tasks from "../pages/Tasks";
import Profile from "../pages/Profile";
import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import SingleTeam from "../pages/SingleTeam";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<SingleTeam />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
