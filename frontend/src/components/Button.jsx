import React from "react";

const Button = ({ text, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`w-full py-2 my-5 rounded-lg text-white transition
    ${
      disabled
        ? "bg-blue-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }`}
    >
      {text}
    </button>
  );
};

export default Button;
