import React from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LoginForm from "../Components/Auth/LoginForm";
import RegisterForm from "../Components/Auth/RegisterForm";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === "/login";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#C5F1E1] to-white">
      <div className="relative flex bg-white rounded-2xl shadow-xl overflow-hidden w-3/5 h-[60vh]">
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-green-200 rounded-full "></div>
        <div className="relative w-3/5 p-8 flex justify-center items-center overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: isLogin ? "0%" : "-100%" }}
            transition={{ duration: 0.5 }}
            className="absolute w-full"
          >
            <LoginForm />
          </motion.div>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: isLogin ? "100%" : "0%" }}
            transition={{ duration: 0.5 }}
            className="absolute w-full"
          >
            <RegisterForm />
          </motion.div>
        </div>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: isLogin ? "0%" : "0%" }}
          transition={{ duration: 0.5 }}
          className=" w-2/5 bg-gradient-to-b from-[#8edfc1] to-[#15ec9e] text-white flex flex-col justify-center items-center p-6 relative w-2/5 bg-blue-500 text-white flex flex-col justify-center items-center p-6 h-[60vh]"
        >
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-green-200 rounded-full"></div>
          {/* <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-green-200 rounded-full overflow-clip"></div> */}
          <motion.div
            key={isLogin ? "loginSidebar" : "registerSidebar"}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center relative"
          >
            <h2 className="text-2xl font-bold mb-2">
              {isLogin ? "New to Our Platform?" : "Already a member?"}
            </h2>
            <p className="text-sm mb-4">
              {isLogin
                ? "Join us today and explore exclusive features tailored just for you. Create an account in seconds and start your journey!"
                : " Welcome back! Log in to access your account and continue enjoying our services with ease."}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(isLogin ? "/register" : "/login")}
              className="bg-white text-green-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              {isLogin ? (
                <span className="flex justify-center items-center gap-2">
                  Register <PersonAddIcon />
                </span>
              ) : (
                <span className="flex justify-center items-center gap-2">
                  Log In <LockOpenIcon />
                </span>
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
