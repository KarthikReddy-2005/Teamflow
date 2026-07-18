import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const LoginForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      await login(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
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
      <Button text={loading ? "Logging in..." : "login"} disabled={loading} />
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
