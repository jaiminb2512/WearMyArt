import React, { useEffect, useState } from "react";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const Auth = () => {
  const [isRegisterMode, setRegisterMode] = useState(false);

  const location = useLocation();
  useEffect(() => {
    setRegisterMode(location.pathname.includes("/register"));
  }, []);

  const navigate = useNavigate();
  const handleRegisterClick = () => {
    setRegisterMode(true);
    navigate(`/register`);
  };

  const handleLogInClick = () => {
    setRegisterMode(false);
    navigate(`/login`);
  };

  return (
    <div className={`container ${isRegisterMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <div
            className={`sign-in-form flex items-center justify-center flex-col transition-all duration-[0.2s] delay-[0.7s] overflow-hidden col-[1_/_2] row-[1_/_2] px-20 py-0 ${
              !isRegisterMode
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <LoginForm />
          </div>
          <div
            className={`sign-in-form flex items-center justify-center flex-col transition-all duration-[0.2s] delay-[0.7s] overflow-hidden col-[1_/_2] row-[1_/_2] px-20 py-0 ${
              isRegisterMode
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <RegisterForm />
          </div>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New to Our Platform?</h3>
            <p>
              Join us today and explore exclusive features tailored just for
              you. Create an account in seconds and start your journey!
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={handleRegisterClick}
            >
              <span className="flex justify-center items-center gap-2">
                Register <PersonAddIcon />
              </span>
            </button>
          </div>
          <img
            src="img/register.svg"
            className="image"
            alt="Register illustration"
          />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>Already Have an Account?</h3>
            <p>
              Welcome back! Log in to access your account and continue enjoying
              our services with ease.
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={handleLogInClick}
            >
              <span className="flex justify-center items-center gap-2">
                Log In <LockOpenIcon />
              </span>
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="Log In illustration" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
