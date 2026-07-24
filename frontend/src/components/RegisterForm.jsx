import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await register(formData);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Username"
        id="username"
        placeholder="Choose a username"
        value={formData.username}
        onChange={handleChange}
      />
      <Input
        label="Email"
        id="email"
        inputType="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        label="Password"
        id="password"
        inputType="password"
        placeholder="Create a password"
        value={formData.password}
        onChange={handleChange}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <Button
        text={loading ? "Registering..." : "Register"}
        disabled={loading}
      />
      <p className="text-center">
        Already have an Account ?{" "}
        <Link to="/login" className="text-blue-700">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
