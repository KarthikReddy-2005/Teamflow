import React from "react";

const Button = ({ text }) => {
  return (
    <button className="w-full bg-blue-600 text-white py-2 my-5 rounded-lg hover:bg-blue-700">
      {text}
    </button>
  );
};

export default Button;
