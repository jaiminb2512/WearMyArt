import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SettingsIcon from "@mui/icons-material/Settings";

export const LoginData = [
  { name: "Log Out", icon: ExitToAppIcon, path: "/logout" },
  { name: "Profile", icon: AccountCircleIcon, path: "/dashboard/profile" },
];

export const LogoutData = [
  { name: "Register", icon: PersonAddIcon, path: "register" },
  { name: "Login", icon: LockOpenIcon, path: "/login" },
];

export const everyOne = [
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: AccountCircleIcon,
  },
  {
    name: "Log Out",
    path: "/logout",
    icon: ExitToAppIcon,
  },
];

export const isAdmin = [
  {
    name: "Products",
    path: "/products",
    icon: InventoryIcon,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: ListAltIcon,
  },
  {
    name: "Users",
    path: "/all-users",
    icon: PeopleIcon,
  },
];

export const isCustomer = [
  {
    name: "Products",
    path: "/products",
    icon: InventoryIcon,
  },
  {
    name: "Cart",
    path: "/cart",
    icon: ShoppingCartIcon,
  },
  {
    name: "Orders",
    path: "/all-orders",
    icon: ListAltIcon,
  },
];

export const sidebarCustomer = [
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: AccountCircleIcon,
  },
  {
    name: "Cart",
    path: "/cart",
    icon: ShoppingCartIcon,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: ListAltIcon,
  },

  // delete this
  {
    name: "All Products",
    path: "/all-products",
    icon: InventoryIcon,
  },
  {
    name: "All Users",
    path: "/all-users",
    icon: SupervisorAccountIcon,
  },
  {
    name: "All Orders",
    path: "/all-orders",
    icon: ListAltIcon,
  },
];

export const sidebarAdmin = [
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: AccountCircleIcon,
  },
  {
    name: "All Products",
    path: "/all-products",
    icon: InventoryIcon,
  },
  {
    name: "Users",
    path: "/all-users",
    icon: SupervisorAccountIcon,
  },
  {
    name: "Orders",
    path: "/all-orders",
    icon: ListAltIcon,
  },
];

export const sidebarBottom = [
  {
    name: "Settings",
    icon: SettingsIcon,
  },
  {
    name: "Log Out",
    icon: ExitToAppIcon,
  },
];
