import User from "../../models/User.model.js";
import ApiResponse from "../../Utils/ApiResponse.js";
import { GenerateAndSetTokens } from "../../Utils/GenerateAndSetTokens.js";

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

    if (OTP !== existedUser.OTP || existedUser.OTPExpiry < Date.now()) {
      return ApiResponse(
        res,
        false,
        "Invalid OTP or OTP has expired, please try again",
        401
      );
    }

    existedUser.isVerified = true;

    const { AccessToken, RefreshToken } = GenerateAndSetTokens(
      existedUser._id,
      res
    );

    await existedUser.save();
    const userResponse = existedUser.toObject();
    userResponse.AccessToken = AccessToken;
    userResponse.RefreshToken = RefreshToken;
    delete userResponse.isAdmin;
    delete userResponse.OTP;
    delete userResponse.OTPExpiry;

    return ApiResponse(
      res,
      true,
      userResponse,
      "User verified successfully",
      200
    );
  } catch (error) {
    return ApiResponse(res, false, error.message, 500);
  }
};

export default VerifyUser;
