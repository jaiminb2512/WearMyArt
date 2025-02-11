import ApiResponse from "../../Utils/ApiResponse.js";
import User from "../../models/User.model.js";
import bcrypt from "bcrypt";

const UpdateUser = async (req, res) => {
  try {
    const { id, name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ensure that the operation is awaited and capture the updated user.
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password: hashedPassword },
      { new: true } // `new: true` ensures the updated document is returned.
    ).select("-password");

    if (!updatedUser) {
      return ApiResponse(res, false, null, "User not found", 404); // 404 is more appropriate than 401 for 'not found'
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
