import ApiResponse from "../../Utils/ApiResponse.js";
import Order from "../../models/Order.model.js";

const UpdateOrderState = async (req, res) => {
  try {
    const { id } = req.params;
    const { State } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return ApiResponse(res, false, "Order not found", 404);
    }

    order.State = State;
    const updatedOrder = await order.save();

    return ApiResponse(
      res,
      true,
      updatedOrder,
      `Order state updated to '${State}' successfully`,
      200
    );
  } catch (error) {
    return ApiResponse(res, false, error.message, 500);
  }
};

export default UpdateOrderState;
