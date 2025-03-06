import SidebarLink from "./ui/SidebarLink";
import navigation from "../_nav";
import { Link } from "react-router-dom";

const userRole = "Admin";

// const Sidebar = () => {
//   return (
//     <aside className="fixed h-full w-64 z-50 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-[#252E3E] ">
//       <div className="sidebar-header flex items-center justify-center py-4">
//         <Link to={"/dashboard"}>
//           <img src="/src/assets/Logo.png" alt="Logo" />
//         </Link>
//       </div>
//       <div className="sidebar-content px-4 py-2">
//         <ul className="flex flex-col w-full">
//           <SidebarLink items={navigation} userRole={userRole} />
//         </ul>
//       </div>

//       <div className="flex justify-end items-end text-white">
//         Copyright &copy; 2025{" "}
//         <a href="https://www.linkedin.com/in/abdulaziz-alqarni-7a9a831b7/">
//           Gigmosaic
//         </a>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

const Sidebar = () => {
  return (
    <aside className="fixed h-full w-64 z-50 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-[#252E3E] flex flex-col">
      {/* Sidebar Header */}
      <div className="sidebar-header flex items-center justify-center py-4">
        <Link to={"/dashboard"}>
          <img src="/src/assets/Logo.png" alt="Logo" />
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
        <p className="text-gray-400 text-xs">V 1.00</p>
      </div>
    </aside>
  );
};

export default Sidebar;
