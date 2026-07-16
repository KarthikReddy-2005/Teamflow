import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <AuthLayout title="Welcome Back ">
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
