import React from "react";
import Logo from "../components/Logo";
import Card from "../components/Card";

const AuthLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Card>
        <Logo />
        <h1 className="text-3xl font-bold  mt-4 mb-6">{title}</h1>
        {children}
      </Card>
    </div>
  );
};

export default AuthLayout;
