import { Router } from "express";
import tokenVerification from "../middleware/tokenVerification.js";
import {
  registerUser,
  sendingMailForLoginUser,
  loginUser,
  sendingMailForForgotPassword,
  forgotPassword,
  getAllOwnOrder,
  getSingleUser,
  updateUser,
  logoutUser,
  deActivateUser,
  sendingMailForActivate,
  verifyActivationOTP,
  makeAdmin,
  blockUsers,
  unblockUsers,
  getAllUsers,
  otpVerifyForForgotPassword,
  autoLogin,
} from "../controllers/userControllers.js";

const router = Router();

// Registration
router.post("/register", registerUser);

// Login
router.post("/sending-mail-for-login", sendingMailForLoginUser);
router.post("/login", loginUser);
router.post("/auto-login", tokenVerification, autoLogin);

// Forgot Password
router.post("/sending-mail-for-forgot-password", sendingMailForForgotPassword);
router.post("/otp-verify-for-forgot-password", otpVerifyForForgotPassword);
router.post("/forgot-password", forgotPassword);

// Activate - deactivate user
router.put("/deactivate-user", tokenVerification, deActivateUser);
router.post("/sending-mail-for-activation", sendingMailForActivate);
router.put("/verify-activation-otp", verifyActivationOTP);

// Admin Requests
router.get(
  "/single-user/:id",
  (req, res, next) => tokenVerification(req, res, next, true),
  getSingleUser
);
router.patch(
  "/make-admin/:id",
  (req, res, next) => tokenVerification(req, res, next, true),
  makeAdmin
);
router.patch(
  "/block-users",
  (req, res, next) => tokenVerification(req, res, next, true),
  blockUsers
);
router.patch(
  "/unblock-users",
  (req, res, next) => tokenVerification(req, res, next, true),
  unblockUsers
);
router.get(
  "/get-all-users",
  (req, res, next) => tokenVerification(req, res, next, true),
  getAllUsers
);
router.put("/update-user", tokenVerification, updateUser);
router.post("/logout", tokenVerification, logoutUser);
router.post("/get-all-own-orders", tokenVerification, getAllOwnOrder);

export default router;
