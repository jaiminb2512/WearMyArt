import User from "../../models/User.model.js";
import ApiResponse from "../../Utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const VerifyUser = async (req, res) => {
  try {
    const { Email, OTP } = req.body;

    const existedUser = await User.findOne({ Email });

    if (!existedUser) {
      return ApiResponse(
        res,
        false,
        "User does not exist with this email",
        401
      );
    }

    if (OTP === existedUser.OTP && existedUser.OTPExpiry > Date.now()) {
      existedUser.isVerified = true;

      await existedUser.save();

      const token = jwt.sign(
        {
          userId: existedUser._id,
          Email: existedUser.Email,
          isAdmin: existedUser.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      const options = {
        httpOnly: true,
        secure: true,
      };

      res.cookie("Authorization", token, options);

      return ApiResponse(res, true, "User verified successfully", 200);
    } else {
      return ApiResponse(
        res,
        false,
        "Invalid OTP or OTP has expired, please try again",
        401
      );
    }
  } catch (error) {
    return ApiResponse(res, false, error.message, 500);
  }
};

export default VerifyUser;
