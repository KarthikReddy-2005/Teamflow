import { X } from "lucide-react";
import React from "react";

const SideDrawer = ({ title, open, close, children }) => {
  return (
    <div
      className={`p-6 w-112.5 border-l transition-all ${open ? "block" : "hidden"}`}
    >
      <div className="flex items-center gap-7">
        <button
          onClick={() => close(false)}
          className="hover:bg-slate-200 cursor-pointer rounded-full p-2"
        >
          <X size={20} />
        </button>
        <p className="text-2xl">{title}</p>
      </div>
      {children}
    </div>
  );
};

export default SideDrawer;
