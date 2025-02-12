import Product from "../../models/Product.model.js";
import ApiResponse from "../../Utils/ApiResponse.js";

const GetAllProduct = async (req, res) => {
  try {
    const Products = await Product.find({});

    return ApiResponse(res, true, Products, "Product added successfully", 200);
  } catch (error) {
    return ApiResponse(res, false, error.message, 500);
  }
};

export default GetAllProduct;
