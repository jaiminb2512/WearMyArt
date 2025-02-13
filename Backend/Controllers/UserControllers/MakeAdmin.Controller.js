import User from "../../models/User.model.js";
import ApiResponse from "../../Utils/ApiResponse.js";

const MakeAdmin = async (req, res) => {
  try {
    const { Email } = req.body;

    // Find the user by their email
    const existedUser = await User.findOne({ Email }); // Fixed the case of 'Email' to 'email'

    // If user doesn't exist, return an error
    if (!existedUser) {
      return ApiResponse(
        res,
        false,
        "User does not exist with this email",
        404 // 404 is more appropriate for not found errors
      );
    }

    // Check if the user is already an admin
    if (existedUser.isAdmin) {
      return ApiResponse(
        res,
        false,
        "This user is already an admin",
        400 // Use 400 as the user already has admin rights
      );
    }

    // Update the user's admin status
    existedUser.isAdmin = true;

    // Save the updated user data to the database
    await existedUser.save();

    // Log the updated user for debugging (optional)
    console.log(existedUser);

    // Return a success response
    return ApiResponse(res, true, "User is now an admin", 200);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error); // Log the error to the console for debugging
    return ApiResponse(
      res,
      false,
      "An error occurred while making the user an admin",
      500
    );
  }
};

export default MakeAdmin;
