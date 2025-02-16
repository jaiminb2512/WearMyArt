import jwt from "jsonwebtoken";
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

    const token = jwt.sign(
      {
        userId: existedUser._id,
        Email: existedUser.Email,
        isAdmin: existedUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("Authorization", token, options);

    return ApiResponse(res, true, "User is now an admin", 200);
  } catch (error) {
    console.error(error);
    return ApiResponse(res, false, error.message, 500);
  }
};

export default MakeAdmin;
