import React from "react";
import RegisterForm from "../components/RegisterForm";
import AuthLayout from "../layouts/AuthLayout";

const Register = () => {
  return (
    <AuthLayout title="Create An Account">
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
