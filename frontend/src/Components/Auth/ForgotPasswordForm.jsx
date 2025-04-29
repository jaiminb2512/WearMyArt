import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useApiMutation } from "../../utils/apiRequest";
import ApiURLS from "../../Data/ApiURLS";
import { IoEyeOutline } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";

const ForgotPasswordForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const sendEmailMutation = useApiMutation(
    ApiURLS.ForgotPasswordMail.url,
    ApiURLS.ForgotPasswordMail.method
  );

  const verifyOtpMutation = useApiMutation(
    ApiURLS.otpVerifyForForgotPassword.url,
    ApiURLS.otpVerifyForForgotPassword.method
  );

  const resetPasswordMutation = useApiMutation(
    ApiURLS.ForgotPassword.url,
    ApiURLS.ForgotPassword.method
  );

  const validateEmail = () => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format";
    return "";
  };

  const handleSendEmail = async () => {
    const emailError = validateEmail();
    if (emailError) return setErrors({ email: emailError });

    await sendEmailMutation.mutateAsync({ Email: email });
    setStep(2);
    setTimer(60);
    setIsResendDisabled(true);
  };

  const handleVerifyOtp = async () => {
    if (!otp) return setErrors({ otp: "OTP is required" });

    await verifyOtpMutation.mutateAsync({ Email: email, OTP: otp });
    setStep(3);
  };

  const handleResend = async () => {
    await sendEmailMutation.mutateAsync({ Email: email });
    setTimer(60);
    setIsResendDisabled(true);
  };

  const handleResetPassword = async () => {
    const errors = {};
    if (!newPassword) errors.newPassword = "New password is required";
    if (!confirmPassword)
      errors.confirmPassword = "Confirm password is required";
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!passwordRegex.test(newPassword)) {
      errors.newPassword =
        "Password must be 8-16 characters, include 1 uppercase letter, 1 number, and 1 special character";
    }
    if (newPassword !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    if (Object.keys(errors).length) return setErrors(errors);

    await resetPasswordMutation.mutateAsync({
      Email: email,
      OTP: otp,
      Password: newPassword,
    });
    navigate("/login");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Typography
        variant="h4"
        align="center"
        className="text-green-500 mb-6 mt-3"
      >
        {step === 1
          ? "Enter your email"
          : step === 2
          ? "Verify OTP"
          : "Reset Password"}
      </Typography>

      <form className="flex flex-col gap-4 w-3/4 max-w-md mt-5">
        {step === 1 && (
          <>
            <TextField
              label="Email"
              variant="standard"
              fullWidth
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
              error={!!errors.email}
              helperText={errors.email}
            />
            <Button
              variant="contained"
              color="success"
              onClick={handleSendEmail}
            >
              Send Email
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <TextField
              label="Email"
              variant="standard"
              fullWidth
              value={email}
              disabled
            />
            <TextField
              label="OTP"
              variant="standard"
              fullWidth
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setErrors((prev) => ({ ...prev, otp: "" }));
              }}
              error={!!errors.otp}
              helperText={errors.otp}
            />
            <Typography variant="body2">
              Resend OTP in {timer} seconds
            </Typography>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                color="success"
                onClick={handleResend}
                disabled={isResendDisabled}
              >
                Resend OTP
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleVerifyOtp}
              >
                Verify OTP
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <TextField
              label="New Password"
              type={showPassword ? "text" : "Password"}
              variant="standard"
              fullWidth
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setErrors((prev) => ({ ...prev, newPassword: "" }));
              }}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
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
            <TextField
              label="Confirm Password"
              type={showPassword ? "text" : "Password"}
              variant="standard"
              fullWidth
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
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
            <Button
              variant="contained"
              color="success"
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
