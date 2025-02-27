import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Redux/UserSlice";
import { showToast } from "../Redux/toastSlice";
import { IoEyeOutline } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import ApiURLS from "../Data/ApiURLS";
import { apiRequest } from "../utils/apiRequest"; // Import utility function

const Login = () => {
  const [loginData, setLoginData] = useState({ Email: "", Password: "" });
  const [errors, setErrors] = useState({ Email: "", Password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpButtonDisabled, setIsOtpButtonDisabled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const EmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const onChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let formValid = true;
    const newErrors = { Email: "", Password: "" };

    if (!EmailRegex.test(loginData.Email)) {
      newErrors.Email = "Invalid Email format";
      formValid = false;
    }

    if (!isOtpSent && loginData.Password.length < 6) {
      newErrors.Password = "Password must be at least 6 characters long";
      formValid = false;
    }

    setErrors(newErrors);
    return formValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const url = isOtpSent ? ApiURLS.VerifyOtpLogin : ApiURLS.Login; // Choose API
    const response = await apiRequest(url, "POST", loginData, dispatch);

    if (response.success) {
      dispatch(login(response.data.user));
      dispatch(showToast({ message: response.message, variant: "success" }));
      navigate("/");
    }
  };

  const handleLoginWithOtp = async () => {
    if (!EmailRegex.test(loginData.Email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Email: "Enter a valid email",
      }));
      return;
    }

    setIsOtpButtonDisabled(true);
    const response = await apiRequest(
      ApiURLS.SendingMailForLogin,
      "POST",
      { Email: loginData.Email },
      dispatch
    );

    if (response.success) {
      setIsOtpSent(true);
      dispatch(
        showToast({ message: "OTP sent to your email", variant: "success" })
      );
    } else {
      setIsOtpButtonDisabled(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex justify-center items-center h-screen bg-gray-100"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">
          Login
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="Email"
            placeholder="Enter Email"
            value={loginData.Email}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.Email && (
            <p className="text-red-500 text-sm">{errors.Email}</p>
          )}

          <div className="relative">
            <input
              type={showPassword && !isOtpSent ? "text" : "password"}
              name="Password"
              placeholder={isOtpSent ? "Enter OTP" : "Enter Password"}
              value={loginData.Password}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {!isOtpSent && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-3"
              >
                {showPassword ? <IoEyeOutline /> : <FaEyeSlash />}
              </button>
            )}
          </div>
          {errors.Password && (
            <p className="text-red-500 text-sm">{errors.Password}</p>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <button
            type="submit"
            className="w-full py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
          >
            {isOtpSent ? "Verify OTP" : "Login"}
          </button>

          {!isOtpSent && (
            <button
              type="button"
              onClick={handleLoginWithOtp}
              className={`w-full py-2 text-white font-semibold ${
                isOtpButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } rounded-lg`}
              disabled={isOtpButtonDisabled}
            >
              Login Using OTP
            </button>
          )}
        </div>

        <p className="text-center text-md mt-5">
          Don't have an account?
          <span
            onClick={() => navigate("/register")}
            className="cursor-pointer text-blue-500"
          >
            {" "}
            Register Here
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
