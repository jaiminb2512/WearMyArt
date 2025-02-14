import ApiResponse from "../../Utils/ApiResponse.js";
import SendOTP from "../../Utils/SendOTP.js";
import User from "../../models/User.model.js";

// const generateOTP = () => {
//   return Math.floor(1000 + Math.random() * 9000);
// };

const RegisterUser = async (req, res) => {
  try {
    const { FullName, Email, isAdmin } = req.body;

    // Check if the user already exists and is verified
    const existedUser = await User.findOne({ Email });

    if (existedUser && existedUser.isVerified) {
      return ApiResponse(
        res,
        false,
        "User already exists with this email",
        401
      );
    }

    const OTP = Math.floor(1000 + Math.random() * 9000);
    const OTPExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP expiry set to 10 minutes

    // Create the new user object
    const newUser = new User({
      FullName,
      Email,
      OTP,
      isAdmin,
      OTPExpiry,
    });

    // Send OTP via email
    const textContent = `Your OTP code is ${OTP}. It will expire in 10 minutes.`;
    const otpResponse = await SendOTP(Email, OTP, textContent); // Send OTP to the user email

    if (!otpResponse.success) {
      return ApiResponse(res, false, otpResponse.message, 500); // Handle failure in OTP sending
    }

    // Save the new user to the database
    await newUser.save();

    // Clean up the response data before returning
    const userResponse = newUser.toObject();
    delete userResponse.isAdmin;
    delete userResponse.OTP;
    delete userResponse.OTPExpiry;

    return ApiResponse(
      res,
      true,
      { user: userResponse },
      "User created successfully and OTP sent",
      200
    );
  } catch (error) {
    return ApiResponse(res, false, error.message, 500);
  }
};

export default RegisterUser;
