import { MdExitToApp } from "react-icons/md";
import { VscOrganization } from "react-icons/vsc";
import { GoOrganization } from "react-icons/go";
//Home
import Dashboard from "../page/Dashboard/dashboard";
import Comapnies from "../page/Companies/companies";


export const LinkItems = [
  {
    name: "Create Company",
    icon: VscOrganization,
    href: "/dashboard",
    Component: Dashboard,
  },
  {
    name: "Company List",
    icon: GoOrganization,
    href: "/companylist",
    Component: Comapnies,
  },
];
