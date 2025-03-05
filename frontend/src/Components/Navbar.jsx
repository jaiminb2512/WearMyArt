import Avatar from "@mui/material/Avatar";
import React from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../Theme/ThemeToggle";

function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full shadow-md z-50 backdrop-blur-3xl">
      <div className="px-[5vw] flex justify-between items-center py-4">
        <div className="flex items-center gap-5 cursor-pointer">
          <div>logo</div>
          <div>WearMyArt</div>
        </div>
        <div className="flex items-center gap-5 cursor-pointer">
          <div onClick={() => navigate("/register")} className="cursor-pointer">
            Register
          </div>
          <div onClick={() => navigate("/login")} className="cursor-pointer">
            Login
          </div>
          <div onClick={() => navigate("/products")} className="cursor-pointer">
            Products
          </div>
          <Avatar {...stringAvatar("Jaimin Prajapati")} />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
