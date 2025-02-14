import User from "../../models/User.model.js";
import ApiResponse from "../../Utils/ApiResponse.js";

const GetSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const SingleUser = await User.findById(id);

    return ApiResponse(res, true, SingleUser, "User Fetched Successfully", 200);
  } catch (error) {
    return ApiResponse(res, false, error.message, 500);
  }
};

export default GetSingleUser;
