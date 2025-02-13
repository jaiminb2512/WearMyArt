import Product from "../../models/Product.model.js";
import ApiResponse from "../../Utils/ApiResponse.js";

const GetSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const SingleProduct = await Product.findById(id);

    return ApiResponse(
      res,
      true,
      SingleProduct,
      "Product added successfully",
      200
    );
  } catch (error) {
    return ApiResponse(res, false, error.message, 500);
  }
};

export default GetSingleProduct;
