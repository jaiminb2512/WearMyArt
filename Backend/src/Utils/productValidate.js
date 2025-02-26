import Product from "../models/productModel.js";
import ApiResponse from "./ApiResponse.js";

export default async function productValidate(ProductId, res, Quantity) {
  const ExistedProduct = await Product.findById(ProductId);

  if (!ExistedProduct) {
    return ApiResponse(res, false, null, "Product is not valid", 400);
  }

  if (Quantity > ExistedProduct.Stock) {
    return ApiResponse(res, false, null, "Stock is not available", 400);
  } else {
    return ExistedProduct;
  }
}
