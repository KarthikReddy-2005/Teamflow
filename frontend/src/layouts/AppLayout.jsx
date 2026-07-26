import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const AppLayout = () => {
  const [collapse, setCollapse] = useState(false);
  return (
    <div className="flex h-screen">
      <Sidebar collapse={collapse} setCollapse={setCollapse} />

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
