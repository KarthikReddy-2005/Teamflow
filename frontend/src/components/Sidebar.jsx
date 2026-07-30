import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import {
  CheckSquare,
  Folder,
  LayoutDashboardIcon,
  LogOut,
  PanelLeft,
  PanelRight,
  User,
  Users,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ collapse, setCollapse }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    { name: "Teams", path: "/teams", icon: Users },
    { name: "Projects", path: "/projects", icon: Folder },
    { name: "Tasks", path: "/tasks", icon: CheckSquare },
    { name: "Profile", path: "/profile", icon: User },
  ];

  const handleCollapse = () => setCollapse((prev) => !prev);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <aside
      className={`min-h-screen border-r flex flex-col space-y-3 p-4 transition-all duration-300 ${collapse ? "w-20" : "w-64"}`}
    >
      <div
        className={`flex items-center px-3 py-3 ${collapse ? "justify-center" : "justify-between"}`}
      >
        <div
          className={
            collapse
              ? "opacity-0 w-0 overflow-hidden"
              : "transition-all duration-300 block"
          }
        >
          <Logo />
        </div>
        <button
          type="button"
          onClick={handleCollapse}
          aria-label={collapse ? "Expand sidebar" : "Collapse sidebar"}
          className="border-none"
        >
          {collapse ? (
            <PanelRight size={30} strokeWidth={1.2} />
          ) : (
            <PanelLeft size={30} strokeWidth={1.2} />
          )}
        </button>
      </div>
      <nav className="flex-1 flex flex-col overflow-y-auto space-y-4">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-3 rounded-md transition-colors font-medium ${
                  isActive
                    ? "bg-blue-500 text-white "
                    : "text-gray-700 hover:bg-gray-100"
                }
                ${collapse ? "justify-center" : "gap-3"}
                `
              }
            >
              <Icon size={20} />
              {!collapse && link.name}
            </NavLink>
          );
        })}
      </nav>
      <button
        onClick={handleLogout}
        className={`flex items-center gap-3 px-3 py-3 text-red-500 rounded-md hover:bg-red-100 ${collapse ? "justify-center" : "gap-3 "}`}
      >
        <LogOut size={20} />
        {!collapse && "Logout"}
      </button>
    </aside>
  );
};

export default Sidebar;
