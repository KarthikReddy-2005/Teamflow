import React from "react";

const Card = ({ children }) => {
  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
      {children}
    </div>
  );
};

export default Card;
