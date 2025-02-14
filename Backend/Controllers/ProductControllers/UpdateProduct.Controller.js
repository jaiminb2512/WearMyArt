import Product from "../../models/Product.model.js";
import ApiResponse from "../../Utils/ApiResponse.js";
import deleteFiles from "../../Utils/deleteFiles.js";

const UpdateProduct = async (req, res) => {
  try {
    const { id, Size, Cost, Stock, Sleeve, Gender, Color } = req.body;

    const FoundProduct = await Product.findById(id);

    if (!FoundProduct) {
      return ApiResponse(res, false, "Product not found", 400);
    }

    if (req.files && req.files.length > 0) {
      if (FoundProduct.ImgURL && FoundProduct.ImgURL.length > 0) {
        deleteFiles(FoundProduct.ImgURL);
      }

      const ImgURL = req.files.map((file) => file.path);
      FoundProduct.ImgURL = ImgURL;
    }

    const UpdatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        Size,
        Cost,
        Sleeve,
        Stock,
        Gender,
        Color,
        ImgURL: FoundProduct.ImgURL,
      },
      { new: true }
    );

    return ApiResponse(
      res,
      true,
      UpdatedProduct,
      "Product Updated successfully",
      200
    );
  } catch (error) {
    return ApiResponse(res, false, error.message, 500);
  }
};

export default UpdateProduct;
