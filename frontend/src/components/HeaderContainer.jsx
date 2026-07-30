import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import ActionMenu from "./ActionMenu";

const HeaderContainer = ({ title, actions, activatePanel, def }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAction = (action) => {
    setMenuOpen(false);
    activatePanel(action);
  };
  return (
    <div className="flex flex-row justify-between items-center p-4 px-12 w-full border-b ">
      <p
        onClick={() => activatePanel(def)}
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
          <ActionMenu
            actions={actions}
            onAction={handleAction}
            onClose={() => setMenuOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default HeaderContainer;
