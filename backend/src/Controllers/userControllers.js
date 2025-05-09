import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import apiResponse from "../utils/apiResponse.js";
import mongoose from "mongoose";
import { generateAndSetTokens } from "../utils/generateAndSetTokens.js";
import { sendMail } from "../utils/sendMail.js";
import bcrypt from "bcrypt";
import notificationQueue from "../queues/notificationQueue.js";

const generateOTP = () => {
  const OTP = Math.floor(100000 + Math.random() * 900000);
  const OTPExpiry = new Date(Date.now() + 10 * 60 * 1000);

  return { OTP, OTPExpiry };
};

const validatePassword = (password) => {
  const minLength = 8;
  const maxLength = 16;
  const uppercaseRegex = /[A-Z]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const numericRegex = /[0-9]/;

  if (password.length < minLength || password.length > maxLength) {
    return {
      success: false,
      message: `Password must be between ${minLength} and ${maxLength} characters.`,
    };
  }

  if (!uppercaseRegex.test(password)) {
    return {
      success: false,
      message: "Password must contain at least one uppercase letter.",
    };
  }

  if (!specialCharRegex.test(password)) {
    return {
      success: false,
      message: "Password must contain at least one special character.",
    };
  }

  if (!numericRegex.test(password)) {
    return {
      success: false,
      message: "Password must contain at least one numerical character.",
    };
  }

  return { success: true };
};

const validateUserCredentials = ({ FullName, Email, Password }) => {
  if (!FullName || typeof FullName !== "string" || FullName.trim().length < 3) {
    return {
      success: false,
      message: "Full name must be at least 3 characters long.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!Email || !emailRegex.test(Email)) {
    return {
      success: false,
      message: "Invalid email address.",
    };
  }

  const passwordValidation = validatePassword(Password);
  if (!passwordValidation.success) {
    return passwordValidation;
  }

  return { success: true };
};

const registerUser = async (req, res) => {
  try {
    const { FullName, Email, Password } = req.body;

    const userCredentialsValidation = validateUserCredentials({
      FullName,
      Email,
      Password,
    });
    if (!userCredentialsValidation.success) {
      return apiResponse(
        res,
        false,
        null,
        userCredentialsValidation.message,
        400
      );
    }

    const existedUser = await User.findOne({ Email });

    if (existedUser) {
      return apiResponse(
        res,
        false,
        null,
        existedUser.isActive
          ? "User already exists"
          : "User exists but inactive",
        existedUser.isActive ? 401 : 402
      );
    }

    const { OTP, OTPExpiry } = generateOTP();
    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = new User({
      FullName,
      Email,
      Password: hashedPassword,
      OTP,
      OTPExpiry,
    });

    await newUser.save();

    const htmlContent = `
      <p>Hello, ${FullName}</p>
      <p>Thank you for registering with WearMyArt!</p>
      <p>Your OTP code is <strong>${OTP}</strong>. It will expire in 10 minutes.</p>
      <p>Please enter this OTP code in the registration form to complete your registration.</p>
      <p>If you encounter any issues, feel free to contact our support team.</p>
      <p>Thank you for choosing WearMyArt!</p>
    `;

    const name = "WearMyArt Registration";
    const subject = "Registration code of WearMyArt";
    const otpResponse = await sendMail(Email, name, subject, htmlContent);

    if (!otpResponse.success) {
      return apiResponse(res, false, null, otpResponse.message, 500);
    }

    return apiResponse(
      res,
      true,
      null,
      "User created successfully and OTP sent",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const sendingMailForLoginUser = async (req, res) => {
  try {
    const { Email } = req.body;
    const user = await User.findOne({ Email });

    if (!user) {
      return apiResponse(res, false, null, "Invalid Email", 400);
    }

    if (user.isBlocked) {
      return apiResponse(res, false, null, "User is Blocked", 400);
    }

    if (!user.isActive) {
      return apiResponse(res, false, null, "User is not Active", 400);
    }

    const { OTP, OTPExpiry } = generateOTP();

    user.OTP = OTP;
    user.OTPExpiry = OTPExpiry;

    const htmlContent = `
      <p>Hello, ${user.FullName}</p>
      <p>You've requested to log in to WearMyArt. Your One-Time Password (OTP) code is: <strong>${OTP}</strong></p>
      <p>This OTP will expire in 10 minutes, so please use it before it expires.</p>
      <p>If you encounter any issues or did not request this login attempt, please contact our support team.</p>
      <p>Thank you for using WearMyArt!</p>
    `;

    const name = "WearMyArt Login";
    const subject = "Login code of WearMyArt";
    const otpResponse = await sendMail(Email, name, subject, htmlContent);

    await user.save();

    return apiResponse(res, true, null, "OTP Sent Successfully", 200);
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const loginUser = async (req, res) => {
  try {
    const { Email, OTP, Password } = req.body;
    const user = await User.findOne({ Email });

    if (!user) {
      return apiResponse(res, false, null, "Invalid Email", 400);
    }

    if (!OTP && !Password) {
      return apiResponse(res, false, null, "OTP or Password required", 400);
    }

    if (user.isBlocked) {
      return apiResponse(res, false, null, "User is Blocked", 400);
    }

    if (!user.isActive) {
      return apiResponse(res, false, null, "User is not verified", 403);
    }

    if (Password) {
      const isMatch = await bcrypt.compare(Password, user.Password);
      if (!isMatch) {
        return apiResponse(res, false, null, "Invalid Password", 400);
      }
    } else {
      if (OTP != user.OTP) {
        return apiResponse(res, false, null, "Invalid OTP", 400);
      }
      if (user.OTPExpiry < Date.now()) {
        return apiResponse(res, false, null, "OTP Expired", 400);
      }
    }

    const { RefreshToken } = generateAndSetTokens(user._id, res);

    const userResponse = {
      FullName: user.FullName,
      Email,
      isAdmin: user.isAdmin,
    };

    return apiResponse(
      res,
      true,
      { user: userResponse, RefreshToken },
      "User Successfully Login",
      200
    );
  } catch (error) {
    console.log(error.message);
    return apiResponse(res, false, null, error.message, 500);
  }
};

const autoLogin = async (req, res) => {
  try {
    const { FullName, Email, isAdmin } = req.user;

    const userResponse = {
      FullName,
      Email,
      isAdmin,
    };

    return apiResponse(
      res,
      true,
      { user: userResponse },
      "User Successfully Login",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const makeAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return apiResponse(res, false, null, "User not found", 400);
    }
    if (user.isBlocked) {
      return apiResponse(res, false, null, "User is Blocked", 400);
    }
    if (user.isAdmin) {
      return apiResponse(res, false, null, "User is already an admin", 400);
    }

    user.isAdmin = true;
    await user.save({ validateBeforeSave: false });

    const htmlContent = `
      <p>Dear ${user.FullName},</p>
      <p>Congratulations! Your request has been approved, and you are now an Admin of WearMyArt.</p>
      <p>You now have administrative privileges to manage the platform effectively.</p>
      <p>If you have any questions or need assistance, please feel free to contact our support team.</p>
      <p>Thank you for being a valuable part of WearMyArt!</p>
      <br/>
      <p>Best Regards,</p>
      <p>WearMyArt Team</p>
    `;

    const name = "WearMyArt Admin";
    const subject = "You are now an Admin of WearMyArt";
    const otpResponse = await sendMail(user.Email, name, subject, htmlContent);

    return apiResponse(
      res,
      true,
      null,
      `Now, ${user.FullName} is an Admin`,
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const sendingMailForForgotPassword = async (req, res) => {
  try {
    const { Email } = req.body;
    const user = await User.findOne({ Email });

    if (!user) {
      return apiResponse(res, false, null, "Invalid Email", 400);
    }

    if (user.isBlocked) {
      return apiResponse(res, false, null, "User is Blocked", 400);
    }

    const { OTP, OTPExpiry } = generateOTP();

    user.OTP = OTP;
    user.OTPExpiry = OTPExpiry;

    const htmlContent = `
      <p>Hello, ${user.FullName}</p>
      <p>You've requested to Forgot Password in to WearMyArt. Your One-Time Password (OTP) code is: <strong>${OTP}</strong></p>
      <p>This OTP will expire in 10 minutes, so please use it before it expires.</p>
      <p>If you encounter any issues or did not request this login attempt, please contact our support team.</p>
      <p>Thank you for using WearMyArt!</p>
    `;

    const name = "WearMyArt Forgot Password";
    const subject = "Forgot Password code of WearMyArt";
    const otpResponse = await sendMail(Email, name, subject, htmlContent);

    await user.save();

    return apiResponse(res, true, null, "OTP Sent Successfully", 200);
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};
const otpVerifyForForgotPassword = async (req, res) => {
  try {
    const { Email, OTP } = req.body;
    const user = await User.findOne({ Email });

    if (!user) {
      return apiResponse(res, false, null, "Invalid Email", 400);
    }

    if (user.isBlocked) {
      return apiResponse(res, false, null, "User is Blocked", 400);
    }

    if (user.OTP != OTP) {
      return apiResponse(res, true, null, "Invalid OTP", 200);
    }

    if (user.OTPExpiry < Date.now()) {
      return apiResponse(res, false, null, "OTP Expired", 400);
    }

    return apiResponse(res, true, null, "OTP is Verified", 200);
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { Email, OTP, Password } = req.body;
    const user = await User.findOne({ Email });

    if (!user) {
      return apiResponse(res, false, null, "Invalid Email", 400);
    }
    if (user.isBlocked) {
      return apiResponse(res, false, null, "User is Blocked", 400);
    }
    if (OTP != user.OTP) {
      return apiResponse(res, false, null, "Invalid OTP", 400);
    }
    if (user.OTPExpiry < Date.now()) {
      return apiResponse(res, false, null, "OTP Expired", 400);
    }

    const passwordValidation = validatePassword(Password);
    if (!passwordValidation.success) {
      return apiResponse(res, false, null, passwordValidation.message, 400);
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    user.Password = hashedPassword;

    await user.save({ validateBeforeSave: true });

    const userResponse = {
      FullName: user.FullName,
      Email: user.Email,
    };

    const htmlContent = `
  <p>Hello, ${user.FullName}</p>
  <p>Your password has been changed successfully for WearMyArt.</p>
  <p>If you did not request this change, please contact our support team immediately.</p>
  <p>For security reasons, we recommend using a strong and unique password.</p>
  <p>Thank you for choosing WearMyArt!</p>
`;

    const name = "WearMyArt Security";
    const subject = "Your Password Has Been Changed Successfully";
    const otpResponse = await sendMail(Email, name, subject, htmlContent);

    return apiResponse(
      res,
      true,
      { user: userResponse },
      "Password Changed Successfully",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const getAllOwnOrder = async (req, res) => {
  try {
    const customerId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return apiResponse(res, false, null, "Invalid user ID", 400);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const customerObjectId = new mongoose.Types.ObjectId(customerId);

    const filter = {
      CustomerId: customerObjectId,
    };

    const { Status, CustomizedType, Quantity, FinalCost, OrderDate, Duration } =
      req.body;

    if (Status && Status.length > 0) {
      filter.Status = { $in: Status };
    }

    if (CustomizedType && CustomizedType.length > 0) {
      filter.CustomizedType = { $in: CustomizedType };
    }

    if (Quantity) {
      filter.Quantity = Quantity;
    }

    if (FinalCost && Array.isArray(FinalCost) && FinalCost.length === 2) {
      filter.FinalCost = {
        $gte: parseFloat(FinalCost[0]),
        $lte: parseFloat(FinalCost[1]),
      };
    }

    let dateFilter = {};

    if (OrderDate) {
      const date = new Date(OrderDate);
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);

      dateFilter = {
        createdAt: {
          $gte: date,
          $lt: nextDay,
        },
      };
    }

    if (Duration && Duration.start && Duration.end) {
      const startDate = new Date(Duration.start);
      const endDate = new Date(Duration.end);
      endDate.setDate(endDate.getDate() + 1);

      dateFilter = {
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      };
    }

    if (Object.keys(dateFilter).length > 0) {
      Object.assign(filter, dateFilter);
    }

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments(filter);

    return apiResponse(
      res,
      true,
      {
        orders,
        pagination: {
          total: totalOrders,
          page,
          limit,
          totalPages: Math.ceil(totalOrders / limit),
        },
      },
      "Orders fetched successfully",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, `Error: ${error.message}`, 500);
  }
};
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();

    const AllUser = await User.find({ isAdmin: false })
      .select("_id FullName Email isActive isBlocked createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return apiResponse(
      res,
      true,
      {
        AllUser,
        pagination: {
          total: totalUsers,
          page,
          limit,
          totalPages: Math.ceil(totalUsers / limit),
        },
      },
      "Users Fetched Successfully",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};
const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const SingleUser = await User.findById(id);

    return apiResponse(res, true, SingleUser, "User Fetched Successfully", 200);
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const { FullName, Email } = req.body;

    const updateData = {};
    if (FullName) updateData.FullName = FullName;
    if (Email) {
      const existingUser = await User.findOne({ Email, _id: { $ne: _id } });
      if (existingUser) {
        return apiResponse(res, false, null, "Email is already in use", 400);
      }
      updateData.Email = Email;
    }

    if (Object.keys(updateData).length === 0) {
      return apiResponse(res, false, null, "No valid fields to update", 400);
    }

    const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return apiResponse(res, false, null, "User not found", 404);
    }

    const userResponse = {
      FullName: updatedUser.FullName,
      Email: updatedUser.Email,
    };

    const senderName = "WearMyArt Support";
    const subject = "Your Profile Has Been Updated";

    await notificationQueue.add(
      "send-email",
      {
        to: updatedUser.Email,
        name: updatedUser.FullName,
        subject,
        senderName,
        topic: "nameChanged",
      },
      {
        removeOnComplete: true,
        removeOnFail: true,
      }
    );

    return apiResponse(
      res,
      true,
      { user: userResponse },
      "User Updated Successfully",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const logoutUser = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };

    res.clearCookie("RefreshToken", options);

    return apiResponse(res, true, null, "User is succesfully Logout", 200);
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

// Activate - deactivate user
const deActivateUser = async (req, res) => {
  try {
    const { _id } = req.user;

    const deActivatedUser = await User.findByIdAndUpdate(
      _id,
      { isActive: false },
      { new: true }
    );

    if (!deActivatedUser) {
      return apiResponse(res, false, null, "User not found", 400);
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    res.clearCookie("RefreshToken", options);

    const senderName = "WearMyArt Support";
    const subject = "Account deactivation Notification";

    notificationQueue.add(
      "send-email",
      {
        to: req.user.Email,
        name: req.user.FullName,
        subject,
        senderName,
        topic: "deActivateUser",
      },
      {
        removeOnComplete: true,
        removeOnFail: true,
      }
    );

    return apiResponse(
      res,
      true,
      null,
      "User is successfully deactivated",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};
const sendingMailForActivate = async (req, res) => {
  try {
    const { Email } = req.body;

    const user = await User.findOne({ Email });

    if (!user) {
      return apiResponse(res, false, null, "Invalid Email", 400);
    }

    if (user.isBlocked) {
      return apiResponse(res, false, null, "User is blocked", 403);
    }

    if (user.isActive) {
      return apiResponse(res, false, null, "User is already activated", 400);
    }

    const { OTP, OTPExpiry } = generateOTP();

    user.OTP = OTP;
    user.OTPExpiry = OTPExpiry;

    const htmlContent = `
      <p>Hello, ${user.FullName}</p>
      <p>You’ve requested to activate your WearMyArt account. Your One-Time Password (OTP) is: <strong>${OTP}</strong></p>
      <p>This OTP will expire in 10 minutes. Please use it to verify your account and activate access.</p>
      <p>If you did not request this activation, please ignore this message or contact our support team.</p>
      <p>Thank you,<br/>The WearMyArt Team</p>
    `;

    const senderName = "WearMyArt";
    const subject = "WearMyArt Account Activation OTP";

    await sendMail(Email, senderName, subject, htmlContent);
    await user.save();

    return apiResponse(
      res,
      true,
      null,
      "OTP sent successfully for account activation",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};
const verifyActivationOTP = async (req, res) => {
  try {
    const { Email, OTP } = req.body;

    const user = await User.findOne({ Email });

    if (!user) {
      return apiResponse(res, false, null, "User not found", 404);
    }

    if (user.isActive) {
      return apiResponse(res, false, null, "Account is already active", 400);
    }

    if (user.OTP != OTP) {
      return apiResponse(res, false, null, "Invalid OTP", 400);
    }

    if (new Date() > user.OTPExpiry) {
      return apiResponse(res, false, null, "OTP has expired", 400);
    }

    user.isActive = true;
    await user.save();

    const senderName = "WearMyArt Support";
    const subject = "Account activation Notification";

    await notificationQueue.add(
      "send-email",
      {
        to: user.Email,
        name: user.FullName,
        subject,
        senderName,
        topic: "activateUser",
      },
      {
        removeOnComplete: true,
        removeOnFail: true,
      }
    );

    const { RefreshToken } = generateAndSetTokens(user._id, res);

    const userResponse = {
      FullName: user.FullName,
      Email,
      isAdmin: user.isAdmin,
    };

    return apiResponse(
      res,
      true,
      { user: userResponse, RefreshToken },
      "User activated successfully",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const blockUsers = async (req, res) => {
  try {
    const { userIds } = req.body;

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return apiResponse(res, false, null, "User IDs array is required", 400);
    }

    const foundUsers = await User.find({ _id: { $in: userIds } });

    if (foundUsers.length === 0) {
      return apiResponse(
        res,
        false,
        null,
        "No users found with given IDs",
        404
      );
    }

    await User.updateMany(
      { _id: { $in: userIds } },
      { $set: { isBlocked: true } }
    );

    const senderName = "WearMyArt Support";
    const subject = "Account Blocked Notification";

    const emailJobs = foundUsers.map((user) =>
      notificationQueue.add(
        "send-email",
        {
          to: user.Email,
          name: user.FullName,
          subject,
          senderName,
          topic: "blockUser",
        },
        {
          removeOnComplete: true,
          removeOnFail: true,
        }
      )
    );

    await Promise.all(emailJobs);

    return apiResponse(
      res,
      true,
      null,
      "Users blocked successfully and notified via email",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const unblockUsers = async (req, res) => {
  try {
    const { userIds } = req.body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return apiResponse(res, false, null, "User IDs array is required", 400);
    }

    const foundUsers = await User.find({ _id: { $in: userIds } });

    if (foundUsers.length === 0) {
      return apiResponse(
        res,
        false,
        null,
        "No users found with given IDs",
        404
      );
    }

    await User.updateMany(
      { _id: { $in: userIds } },
      { $set: { isBlocked: false } }
    );

    const senderName = "WearMyArt Support";
    const subject = "Account Unblocked Notification";

    const emailJobs = foundUsers.map((user) =>
      notificationQueue.add(
        "send-email",
        {
          to: user.Email,
          name: user.FullName,
          subject,
          senderName,
          topic: "unblockUser",
        },
        {
          removeOnComplete: true,
          removeOnFail: true,
        }
      )
    );

    await Promise.all(emailJobs);

    return apiResponse(
      res,
      true,
      null,
      "Users unblocked successfully and notified via email",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

export {
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
};
