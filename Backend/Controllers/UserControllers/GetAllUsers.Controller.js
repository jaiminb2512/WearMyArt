import User from "../../models/User.model.js";
import ApiResponse from "../../Utils/ApiResponse.js";

const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    return ApiResponse(res, true, users, "All users fetched successfully", 200);
  } catch (error) {
    return ApiResponse(res, false, error.message, 500);
  }
};

export default GetAllUsers;
