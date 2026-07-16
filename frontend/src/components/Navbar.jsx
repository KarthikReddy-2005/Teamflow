import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="h-20 bg-blue-400 flex justify-evenly items-center">
      <Link to="/">TeamFlow</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Navbar;
