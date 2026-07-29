import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import TeamMenu from "./TeamMenu";

const TeamHeader = ({ title, role, activatePanel }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAction = (action) => {
    setMenuOpen(false);
    activatePanel(action);
  };
  return (
    <div className="flex flex-row justify-between items-center p-4 px-12 w-full border-b ">
      <p
        onClick={() => activatePanel("groupDetails")}
        className="font-bold text-3xl hover:cursor-pointer"
      >
        {title}
      </p>
      <div className="relative">
        <div
          onClick={() => setMenuOpen((prev) => !prev)}
          className="hover:bg-blue-200 rounded-full p-2 hover:cursor-pointer"
        >
          <EllipsisVertical size={20} />
        </div>
        {menuOpen && (
          <TeamMenu
            role={role}
            onAction={handleAction}
            onClose={() => setMenuOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TeamHeader;
