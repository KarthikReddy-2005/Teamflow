import { Outlet, useOutletContext } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const AppLayout = () => {
  const [collapse, setCollapse] = useState(false);
  const user = useOutletContext();
  return (
    <div className="flex h-screen">
      <Sidebar collapse={collapse} setCollapse={setCollapse} />

      <main className="flex-1 p-6 overflow-auto">
        <Outlet context={user} />
      </main>
    </div>
  );
};

export default AppLayout;
