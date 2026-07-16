import React from "react";
import Input from "./Input";
import Button from "./Button";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <form onSubmit={() => {}} className="space-y-4">
      <Input label="Username" id="username" placeholder="Choose a username" />
      <Input
        label="Email"
        id="email"
        inputType="email"
        placeholder="Enter your email"
      />
      <Input
        label="Password"
        id="password"
        inputType="password"
        placeholder="Create a password"
      />
      <Button text="Register" />
      <p className="text-center">
        Already have an Account ?{" "}
        <Link to="/login" className="text-blue-700">
          Login
        </Link>{" "}
      </p>
    </form>
  );
};

export default RegisterForm;
