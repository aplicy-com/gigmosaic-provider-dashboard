import SidebarLink from "./ui/SidebarLink";
import navigation from "../_nav";
import { Link } from "react-router-dom";
import { version } from "../../package.json";
import Logo from "../assets/Logo.png";

const userRole = "Admin";

const Sidebar = () => {
  return (
    <aside className="fixed h-full w-64 z-50 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-[#252E3E] flex flex-col">
      {/* Sidebar Header */}
      <div className="sidebar-header flex items-center justify-center py-4">
        <Link to={"/dashboard"}>
          <img src={Logo} alt="Logo" />
        </Link>
      </div>

      {/* Sidebar Content */}
      <div className="sidebar-content px-4 py-2 flex-grow">
        <ul className="flex flex-col w-full">
          <SidebarLink items={navigation} userRole={userRole} />
        </ul>
      </div>

      {/* Copyright Section - Now at Bottom */}
      <div className="flex justify-between text-gray-400 p-4  text-xs">
        <div>
          Copyright &copy; 2025{" "}
          <a href="#" className="underline">
            Gigmosaic
          </a>
        </div>
        <p className="text-gray-400 text-xs">V {version}</p>
      </div>
    </aside>
  );
};

export default Sidebar;
