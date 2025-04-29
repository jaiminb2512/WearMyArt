import React from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LoginForm from "../Components/Auth/LoginForm";
import RegisterForm from "../Components/Auth/RegisterForm";
import ForgotPasswordForm from "../Components/Auth/ForgotPasswordForm";
import ActivationForm from "../Components/Auth/ActivationForm";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";
  const isForgotPassword = location.pathname === "/forgot-password";
  const isActivateUser = location.pathname === "/activate-user";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#C5F1E1] to-white p-4">
      <div className="relative flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden md:w-4/5 xl:w-3/5 h-[80vh] md:h-[70vh] xl:h-[65vh] w-full ">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "0%" }}
          transition={{ duration: 0.5 }}
          className="md:w-2/5 h-[250px] md:h-full w-full bg-gradient-to-b from-[#8edfc1] to-[#15ec9e] text-white flex flex-col justify-center items-center p-6 relative"
        >
          <div className="absolute -top-32 -left-32 hidden xl:block md:w-80 md:h-80 bg-green-200 rounded-full"></div>
          <div className="absolute -bottom-32 -right-32 hidden xl:block md:w-80 md:h-80 bg-green-200 rounded-full"></div>

          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center relative"
          >
            <h2 className="text-2xl font-bold mb-2">
              {isLogin
                ? "New to Our Platform?"
                : isRegister
                ? "Already a member?"
                : isForgotPassword
                ? "Reset Your Password"
                : "Account Activation"}
            </h2>
            <p className="text-md mb-4">
              {isLogin
                ? "Join us today and explore exclusive features tailored just for you. Create an account in seconds and start your journey!"
                : isRegister
                ? "Welcome back! Log in to access your account and continue enjoying our services with ease."
                : isForgotPassword
                ? "Enter your email and we'll send you instructions to reset your password."
                : "Enter your email to receive an activation OTP and verify your account."}
            </p>
            {!isForgotPassword && !isActivateUser && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  navigate(
                    isLogin ? "/register" : isRegister ? "/login" : "/login"
                  )
                }
                className="bg-white text-green-900 px-4 py-2 rounded-lg font-semibold hover:bg-green-200 transition cursor-pointer"
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
            )}
          </motion.div>
        </motion.div>

        <div className="relative md:w-3/5 md:h-full w-full h-2/3 p-8 flex justify-center items-center overflow-hidden bg-white">
          {isLogin && <LoginForm />}
          {isRegister && <RegisterForm />}
          {isForgotPassword && <ForgotPasswordForm />}
          {isActivateUser && <ActivationForm />}
        </div>
      </div>
    </div>
  );
}
