import React from "react";

const Logo = () => {
  return (
    <div className="flex justify-items-start items-center">
      <img src="/logo.avif" alt="Teamflow logo" height={50} width={50} />
      <p className="font-semibold">Teamflow</p>
    </div>
  );
};

export default Logo;
