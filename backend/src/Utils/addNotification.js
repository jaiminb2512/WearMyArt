import Notification from "../models/notificationModel.js";
import apiResponse from "./apiResponse.js";

const addNotification = async ({
  res,
  userId,
  title,
  message,
  type = "system",
  relatedOrderId = null,
  relatedProductId = null,
}) => {
  try {
    const newNotification = new Notification({
      userId,
      title,
      message,
      type,
      relatedOrderId,
      relatedProductId,
    });

    const savedNotification = await newNotification.save();
    return savedNotification;
  } catch (error) {
    if (res) {
      return apiResponse(res, false, null, error.message, 500);
    } else {
      throw new Error(error.message);
    }
  }
};

export default addNotification;
