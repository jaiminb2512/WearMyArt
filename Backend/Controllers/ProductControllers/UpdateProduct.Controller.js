import uploadFiles from "../../middleware/uploadFiles.js";
import Product from "../../models/Product.model.js";
import ApiResponse from "../../Utils/ApiResponse.js";
import deleteFiles from "../../Utils/deleteFiles.js";

const UpdateProduct = async (req, res) => {
  uploadFiles(req, res, async (err) => {
    if (err) {
      return ApiResponse(res, false, err.message, 500);
    }
    try {
      const { _id, Size, Cost, Sleeve, Gender, Color } = req.body;

      // Find the existing product by _id
      const FoundProduct = await Product.findById(_id);

      if (!FoundProduct) {
        return ApiResponse(res, false, "Product not found", 400);
      }

      // If new images are uploaded, delete the old ones
      if (req.files && req.files.length > 0) {
        if (FoundProduct.ImgURL && FoundProduct.ImgURL.length > 0) {
          deleteFiles(FoundProduct.ImgURL); // Delete the old images
        }

        // Map new files to their paths and update ImgURL
        const ImgURL = req.files.map((file) => file.path);
        FoundProduct.ImgURL = ImgURL;
      }

      // Update the product with the new details
      const UpdatedProduct = await Product.findByIdAndUpdate(
        _id,
        {
          Size,
          Cost,
          Sleeve,
          Gender,
          Color,
          ImgURL: FoundProduct.ImgURL, // Ensure the updated ImgURL is included
        },
        { new: true }
      );

      // Return the updated product as the response
      return ApiResponse(
        res,
        true,
        UpdatedProduct, // Return the updated product object
        "Product Updated successfully",
        200
      );
    } catch (error) {
      return ApiResponse(res, false, error.message, 500);
    }
  });
};

export default UpdateProduct;
