import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoEyeOutline } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import ApiURLS from "../../Data/ApiURLS.js";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Container,
} from "@mui/material";
import { login } from "../../Redux/UserSlice.js";
import { useApiMutation } from "../../utils/apiRequest.js";
import { motion } from "framer-motion";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    Email: "",
    Password: "",
    OTP: "",
  });
  const [errors, setErrors] = useState({ Email: "", Password: "", OTP: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpButtonDisabled, setIsOtpButtonDisabled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginMutation = useApiMutation(ApiURLS.Login.url, ApiURLS.Login.method);
  const sendOtpMutation = useApiMutation(
    ApiURLS.SendingMailForLogin.url,
    ApiURLS.SendingMailForLogin.method
  );

  const EmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const onChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevData) => ({ ...prevData, [name]: "" }));
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let formValid = true;
    const newErrors = { Email: "", Password: "", OTP: "" };

    if (!EmailRegex.test(loginData.Email)) {
      newErrors.Email = "Invalid Email format";
      formValid = false;
    }

    if (!isOtpSent && loginData.Password.length < 6) {
      newErrors.Password = "Password must be at least 6 characters long";
      formValid = false;
    }

    if (isOtpSent && !loginData.OTP) {
      newErrors.OTP = "Enter the OTP sent to your email";
      formValid = false;
    }

    setErrors(newErrors);
    return formValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let requestData = { Email: loginData.Email };
    if (isOtpSent) {
      requestData.OTP = loginData.OTP;
    } else {
      requestData.Password = loginData.Password;
    }

    const userData = await loginMutation.mutateAsync(requestData);
    if (userData) {
      dispatch(login(userData.user));
      navigate("/");
    }
  };

  const handleSendOtp = async () => {
    if (!EmailRegex.test(loginData.Email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Email: "Enter a valid email",
      }));
      return;
    }

    setIsOtpButtonDisabled(true);
    try {
      await sendOtpMutation.mutateAsync({ Email: loginData.Email });
      setIsOtpSent(true);
      setIsOtpButtonDisabled(false);
    } catch (error) {
      setIsOtpButtonDisabled(false);
      console.error("Send OTP failed", error);
    }
  };

  return (
    <Container component="main">
      <div className="w-full">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          className="text-green-500"
        >
          Login
        </Typography>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4"
          >
            <TextField
              label="Email"
              type="email"
              name="Email"
              value={loginData.Email}
              onChange={onChange}
              fullWidth
              error={!!errors.Email}
              helperText={errors.Email}
              variant="standard"
            />
          </motion.div>

          {!isOtpSent ? (
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-6"
              >
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="Password"
                  value={loginData.Password}
                  onChange={onChange}
                  fullWidth
                  error={!!errors.Password}
                  helperText={errors.Password}
                  variant="standard"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <IoEyeOutline /> : <FaEyeSlash />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </motion.div>
              <Typography variant="body2" align="right">
                <span className="text-green-500">Forgot Password ?</span>
              </Typography>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.0 }}
              className="mb-6"
            >
              <TextField
                label="OTP"
                type="text"
                name="OTP"
                value={loginData.OTP}
                onChange={onChange}
                fullWidth
                error={!!errors.OTP}
                helperText={errors.OTP}
                variant="filled"
              />
            </motion.div>
          )}

          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loginMutation.isLoading}
          >
            {isOtpSent ? "Verify OTP & Login" : "Login"}
          </Button>

          {!isOtpSent && (
            <Button
              variant="outlined"
              color="success"
              fullWidth
              onClick={handleSendOtp}
              disabled={isOtpButtonDisabled || sendOtpMutation.isLoading}
              sx={{ mt: 2 }}
            >
              Login Using OTP
            </Button>
          )}
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
