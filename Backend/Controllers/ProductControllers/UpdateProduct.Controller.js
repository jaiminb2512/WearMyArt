import Product from "../../models/Product.model.js";
import ApiResponse from "../../Utils/ApiResponse.js";

const UpdateProduct = async (req, res) => {
  try {
    const { _id, Size, Cost, Sleeve, Gender, Color } = req.body;

    const FoundProduct = await Product.findByIdAndUpdate(
      _id,
      {
        Size,
        Cost,
        Sleeve,
        Gender,
        Color,
      },
      { new: true }
    );

    if (!FoundProduct) {
      return ApiResponse(res, false, "Product not found", 400);
    }

    return ApiResponse(
      res,
      true,
      FoundProduct,
      "Product Updated successfully",
      200
    );
  } catch (error) {
    return ApiResponse(res, false, error.message, 500);
  }
};

export default UpdateProduct;
