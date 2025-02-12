import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiResponse from "../../Utils/ApiResponse.js";
import User from "../../models/User.model.js";

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return ApiResponse(res, false, "Invalid credentials", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return ApiResponse(res, false, "Invalid credentials", 400);
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    const userResponse = user.toObject();
    delete userResponse.password;

    res.cookie("Authorization", token, options);
    return ApiResponse(
      res,
      true,
      { user: userResponse },
      "User successfully logged in",
      200
    );
  } catch (error) {
    return ApiResponse(res, false, error.message, 500);
  }
};

export default LoginUser;
