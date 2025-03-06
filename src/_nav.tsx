import { AiOutlineSlack } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiDashboardHorizontalFill } from "react-icons/ri";

const _nav = [
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: <RiDashboardHorizontalFill size={19} />,
    allowedRoles: ["Admin"],
  },
  {
    name: "Service",
    to: "/service/all-service",
    icon: <AiOutlineSlack size={19} />,
    allowedRoles: ["Admin"],
  },
  {
    name: "Staff",
    to: "/staff/all-staff",
    icon: <BsFillPeopleFill size={18} />,
    allowedRoles: ["Admin"],
  },
];

export default _nav;
