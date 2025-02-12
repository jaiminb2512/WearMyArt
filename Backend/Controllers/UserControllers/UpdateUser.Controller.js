import ApiResponse from "../../Utils/ApiResponse.js";
import User from "../../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UpdateUser = async (req, res) => {
  try {
    const token = req.cookies.Authorization;

    if (!token) {
      return ApiResponse(
        res,
        false,
        null,
        "No token, authorization denied",
        401
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.userId;

    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, password: hashedPassword },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return ApiResponse(res, false, null, "User not found", 404);
    }

    return ApiResponse(
      res,
      true,
      updatedUser,
      "User Updated Successfully",
      200
    );
  } catch (error) {
    return ApiResponse(res, false, null, error.message, 500);
  }
};

export default UpdateUser;
