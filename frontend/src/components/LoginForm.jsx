import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const LoginForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
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
      await login(formData);
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
        id="email"
        label="Email"
        inputType="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        id="password"
        label="Password"
        inputType="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <Button text={loading ? "Logging in..." : "Login"} disabled={loading} />
      <p className="text-center">
        New to TeamFlow ?{" "}
        <Link to="/register" className="text-blue-600">
          Register here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
