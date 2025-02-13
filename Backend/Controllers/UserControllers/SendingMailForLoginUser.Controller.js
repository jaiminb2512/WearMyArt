import ApiResponse from "../../Utils/ApiResponse.js";
import User from "../../models/User.model.js";

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const SendingMailForLoginUser = async (req, res) => {
  try {
    const { Email } = req.body;
    const user = await User.findOne({ Email });

    if (!user) {
      return ApiResponse(res, false, "Invalid Email", 400);
    }

    if (!user.isVerified) {
      return ApiResponse(res, false, "User is not verified", 400);
    }

    const OTP = generateOTP();
    const OTPExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.OTP = OTP;
    user.OTPExpiry = OTPExpiry;

    await user.save();

    return ApiResponse(res, true, null, "OTP Sent Successfully", 200);
  } catch (error) {
    return ApiResponse(res, false, error.message, 500);
  }
};

export default SendingMailForLoginUser;
