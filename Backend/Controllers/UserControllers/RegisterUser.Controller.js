import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiResponse from "../../Utils/ApiResponse.js";
import User from "../../models/User.model.js";

const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return ApiResponse(
        res,
        false,
        "User already exists with this email",
        401
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("Authorization", token, options);

    const userResponse = newUser.toObject();
    delete userResponse.password;

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
