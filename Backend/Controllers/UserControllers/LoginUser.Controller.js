import ApiResponse from "../../Utils/ApiResponse.js";
import User from "../../models/User.model.js";
import jwt from "jsonwebtoken";

const LoginUser = async (req, res) => {
  try {
    const { Email, OTP } = req.body;
    const user = await User.findOne({ Email });

    if (!user) {
      return ApiResponse(res, false, "Invalid Email", 400);
    }

    if (!user.isVerified) {
      return ApiResponse(res, false, "User is not verified", 400);
    }

    if (OTP !== user.OTP) {
      return ApiResponse(res, false, "Invalid OTP", 400);
    }

    const token = jwt.sign(
      { userId: user._id, Email: user.Email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("Authorization", token, options);

    const userResponse = user.toObject();
    delete userResponse.isAdmin;
    delete userResponse.OTP;
    delete userResponse.OTPExpiry;

    return ApiResponse(res, true, userResponse, "User Successfully Login", 200);
  } catch (error) {
    return ApiResponse(res, false, error.message, 500);
  }
};

export default LoginUser;
