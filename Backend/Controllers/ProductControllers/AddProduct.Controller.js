import Product from "../../models/Product.model.js";
import ApiResponse from "../../Utils/ApiResponse.js";

const AddProduct = async (req, res) => {
  try {
    const { Size, Cost, Sleeve, Quantity, Color, CustomizeOption } = req.body;

    if (!req.files || req.files.length === 0) {
      return ApiResponse(res, false, null, "No images uploaded", 400);
    }

    const ImgURL = req.files.map((file) => file.path);

    const newProduct = new Product({
      ImgURL,
      Size,
      Cost,
      Sleeve,
      Quantity,
      Color,
      CustomizeOption,
    });

    await newProduct.save();

    return ApiResponse(
      res,
      true,
      newProduct,
      "Product added successfully",
      200
    );
  } catch (error) {
    return ApiResponse(res, false, error.message, 500);
  }
};

export default AddProduct;
