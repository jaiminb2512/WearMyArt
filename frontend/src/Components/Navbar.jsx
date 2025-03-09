import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full shadow-md z-10 backdrop-blur-3xl">
      <div className="px-[5vw] flex justify-end items-center py-4 gap-3">
        <div onClick={() => navigate("/")}>logo</div>
        <div onClick={() => navigate("/products")} className="cursor-pointer">
          Products
        </div>
        <div
          onClick={() => navigate("/dashboard/profile")}
          className="cursor-pointer"
        >
          Dashboard
        </div>
      </div>
    </div>
  );
};

export default Navbar;
