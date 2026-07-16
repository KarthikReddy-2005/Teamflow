import React from "react";
import Input from "./Input";
import Button from "./Button";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <form onSubmit={() => {}} className="space-y-4">
      <Input
        id="email"
        label="Email"
        inputType="email"
        placeholder="Enter your email"
      />
      <Input
        id="password"
        label="Password"
        inputType="password"
        placeholder="Enter your password"
      />
      <Button text="Login" />
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
