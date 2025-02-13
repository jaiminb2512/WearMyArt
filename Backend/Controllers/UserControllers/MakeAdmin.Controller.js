import User from "../../models/User.model.js";
import ApiResponse from "../../Utils/ApiResponse.js";

const MakeAdmin = async (req, res) => {
  try {
    const { Email } = req.body;

    const existedUser = await User.findOne({ Email });

    if (!existedUser) {
      return ApiResponse(
        res,
        false,
        "User does not exist with this email",
        404
      );
    }

    if (existedUser.isAdmin) {
      return ApiResponse(res, false, "This user is already an admin", 400);
    }

    existedUser.isAdmin = true;

    await existedUser.save();

    console.log(existedUser);

    return ApiResponse(res, true, "User is now an admin", 200);
  } catch (error) {
    console.error(error);
    return ApiResponse(
      res,
      false,
      "An error occurred while making the user an admin",
      500
    );
  }
};

export default MakeAdmin;
