import ApiResponse from "../../Utils/ApiResponse.js";
import User from "../../models/User.model.js";

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const RegisterUser = async (req, res) => {
  try {
    const { FullName, Email, isAdmin } = req.body;

    const existedUser = await User.findOne({ Email });

    if (existedUser && existedUser.isVerified) {
      return ApiResponse(
        res,
        false,
        "User already exists with this email",
        401
      );
    }

    const OTP = generateOTP();
    const OTPExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = new User({
      FullName,
      Email,
      OTP,
      isAdmin,
      OTPExpiry,
    });

    await newUser.save();

    const userResponse = newUser.toObject();
    delete userResponse.isAdmin;
    delete userResponse.OTP;
    delete userResponse.OTPExpiry;

    return ApiResponse(
      res,
      true,
      { user: userResponse },
      "User created successfully",
      200
    );
  } catch (error) {
    return ApiResponse(res, false, error.message, 500);
  }
};

export default RegisterUser;
