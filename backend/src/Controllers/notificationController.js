import apiResponse from "../utils/apiResponse.js";
import Notification from "../models/notificationModel.js";

const getAllNotification = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

   const userId = req.user._id

    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalNotification = await Notification.countDocuments();

    return apiResponse(
      res,
      true,
      {
        notifications,
        pagination: {
          total: totalNotification,
          page,
          limit,
          totalPages: Math.ceil(totalNotification / limit),
        },
      },
      "Notifications fetched successfully",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};


export { getAllNotification };