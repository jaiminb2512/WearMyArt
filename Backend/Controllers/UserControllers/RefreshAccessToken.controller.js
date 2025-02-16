import User from "../../models/User.model.js";
import ApiResponse from "../../Utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { GenerateAndSetTokens } from "../../Utils/GenerateAndSetTokens.js";

const RefreshAccessToken = async (req, res) => {
  const token = req.cookies?.AccessToken || req.header("AccessToken");

  if (!token) {
    return ApiResponse(
      res,
      false,
      null,
      "No access token, authorization denied",
      401
    );
  }

  try {
    const decodedUser = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    const user = await User.findById(decodedUser?._id);
    if (!user) {
      return ApiResponse(res, false, null, "Token is not valid", 401);
    }

    const { AccessToken } = GenerateAndSetTokens(user._id, res);

    user.AccessToken = AccessToken;
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.isAdmin;
    delete userResponse.OTP;
    delete userResponse.OTPExpiry;

    return ApiResponse(res, true, userResponse, "Tokens are refreshed", 200);
  } catch (error) {
    return ApiResponse(res, false, null, error.message, 401);
  }
};

export default RefreshAccessToken;
