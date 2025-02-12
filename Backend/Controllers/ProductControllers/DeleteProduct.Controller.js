import Product from "../../models/Product.model.js";
import ApiResponse from "../../Utils/ApiResponse.js";

const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const FoundProduct = await Product.findByIdAndDelete(id);

    if (!FoundProduct) {
      return ApiResponse(res, false, "Product not found", 400);
    }

    return ApiResponse(res, true, "Product Deleted successfully", 200);
  } catch (error) {
    return ApiResponse(res, false, error.message, 500);
  }
};

export default DeleteProduct;
