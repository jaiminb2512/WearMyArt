import Product from "../../models/Product.model.js";
import ApiResponse from "../../Utils/ApiResponse.js";
import uploadFiles from "../../middleware/uploadFiles.js";

const AddProduct = async (req, res) => {
  // Upload the files using multer
  uploadFiles(req, res, async (err) => {
    if (err) {
      return ApiResponse(res, false, err.message, 500);
    }

    try {
      // Ensure the images were uploaded correctly
      console.log("Uploaded files:", req.files); // Log the uploaded files for debugging

      const { Size, Cost, Sleeve, Quantity, Color, CustomizeOption } = req.body;

      // If no images were uploaded, send an error
      if (!req.files || req.files.length === 0) {
        return ApiResponse(res, false, null, "No images uploaded", 400);
      }

      // Map the image file paths to an array of URLs
      const ImgURL = req.files.map((file) => file.path);
      console.log("Mapped Image URLs:", ImgURL); // Debug: Log the image paths

      // Create a new product with the provided information and image URLs
      const newProduct = new Product({
        ImgURL,
        Size,
        Cost,
        Sleeve,
        Quantity,
        Color,
        CustomizeOption,
      });

      // Save the new product to the database
      await newProduct.save();

      // Return a successful response with the new product
      return ApiResponse(
        res,
        true,
        newProduct,
        "Product added successfully",
        200
      );
    } catch (error) {
      // Handle any errors that occur during the product creation process
      return ApiResponse(res, false, error.message, 500);
    }
  });
};

export default AddProduct;
