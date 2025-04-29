import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import DashboardSharpIcon from "@mui/icons-material/DashboardSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";

export const NavbarData = [
  { name: "Home", icon: HomeSharpIcon, path: "/" },
  { name: "Products", icon: InventoryIcon, path: "/products" },
  { name: "Dashboard", icon: DashboardSharpIcon, path: "/dashboard/profile" },
];

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
    path: "/profile",
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
    path: "/all-products",
    icon: InventoryIcon,
  },
  {
    name: "Orders",
    path: "/all-orders",
    icon: ListAltIcon,
  },
  {
    name: "Users",
    path: "/all-users",
    icon: PeopleIcon,
  },
  {
    name: "Customize Options",
    path: "/customization-options",
    icon: ListAltIcon,
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
    path: "/orders",
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
    path: "/dashboard/cart",
    icon: ShoppingCartIcon,
  },
  {
    name: "Orders",
    path: "/dashboard/orders",
    icon: ListAltIcon,
  },
];

export const sidebarAdmin = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: DashboardSharpIcon,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: AccountCircleIcon,
  },
  {
    name: "All Products",
    path: "/dashboard/all-products",
    icon: InventoryIcon,
  },
  {
    name: "Users",
    path: "/dashboard/all-users",
    icon: SupervisorAccountIcon,
  },
  {
    name: "Orders",
    path: "/dashboard/all-orders",
    icon: ListAltIcon,
  },
  {
    name: "Customize Options",
    path: "/dashboard/customization-options",
    icon: DashboardCustomizeIcon,
  },
];

export const sidebarBottom = [
  {
    name: "Log Out",
    icon: ExitToAppIcon,
  },
];
