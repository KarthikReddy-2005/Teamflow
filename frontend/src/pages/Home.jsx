import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="h-100 flex flex-col items-center justify-center">
        <h1
          className="font-bold text-center"
          style={{ fontSize: "33vh", lineHeight: 1 }}
        >
          Teamflow
        </h1>
      </div>
    </div>
  );
};

export default Home;
