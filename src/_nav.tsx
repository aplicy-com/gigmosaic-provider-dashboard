import { RxDashboard } from "react-icons/rx";
import { BiBasketball } from "react-icons/bi";

const _nav = [
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: <RxDashboard size={18} />,
    allowedRoles: ["Admin"],
  },
  {
    name: "All Service",
    to: "/service/all",
    icon: <BiBasketball size={18} />,
    allowedRoles: ["Admin"],
  },
  // {
  //   name: "Add Service",
  //   to: "/service/add",
  //   icon: <BiBasketball size={18} />,
  //   allowedRoles: ["Admin"],
  // },
  // {
  //   name: "Update Service",
  //   to: "/service/edit",
  //   icon: <BiBasketball size={18} />,
  //   allowedRoles: ["Admin"],
  // },
];

export default _nav;
