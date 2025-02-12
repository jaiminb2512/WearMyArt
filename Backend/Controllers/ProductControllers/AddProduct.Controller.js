import Product from "../../models/Product.model.js";
import ApiResponse from "../../Utils/ApiResponse.js";

const AddProduct = async (req, res) => {
  try {
    const { ImgURL, Size, Cost, Sleeve, Gender, Color } = req.body;

    const newProduct = Product({
      ImgURL,
      Size,
      Cost,
      Sleeve,
      Gender,
      Color,
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
