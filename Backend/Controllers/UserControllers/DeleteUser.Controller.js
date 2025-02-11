import User from "../../models/User.model.js";
import ApiResponse from "../../Utils/ApiResponse.js";

const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const DeleteUser = await User.findByIdAndDelete(id);

    if (!DeleteUser) {
      return ApiResponse(res, false, "User not found", 400);
    }

    return ApiResponse(res, true, "User is succesfully Deleted", 200);
  } catch (error) {
    return ApiResponse(res, false, error.message, 500);
  }
};

export default DeleteUser;
