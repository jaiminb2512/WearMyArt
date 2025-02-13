import Product from "../../models/Product.model.js";
import ApiResponse from "../../Utils/ApiResponse.js";
import deleteFiles from "../../Utils/deleteFiles.js";

const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const FoundProduct = await Product.findById(id);

    if (!FoundProduct) {
      return ApiResponse(res, false, "Product not found", 400);
    }

    if (FoundProduct.ImgURL && FoundProduct.ImgURL.length > 0) {
      deleteFiles(FoundProduct.ImgURL);
    }

    await Product.findByIdAndDelete(id);

    return ApiResponse(res, true, "Product Deleted successfully", 200);
  } catch (error) {
    return ApiResponse(res, false, error.message, 500);
  }
};

export default DeleteProduct;
