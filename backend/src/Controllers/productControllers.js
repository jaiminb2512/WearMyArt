import mongoose from "mongoose";
import Product from "../models/productModel.js";
import apiResponse from "../utils/apiResponse.js";
import deleteFiles from "../utils/deleteFiles.js";
import path from "path";

const addProduct = async (req, res) => {
  try {
    const {
      Size,
      Price,
      DiscountedPrice,
      Sleeve,
      Stock,
      Color,
      CustomizeOption,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return apiResponse(res, false, null, "No images uploaded", 400);
    }

    const ImgURL = req.files.map(
      (file) => `/uploads/${path.basename(file.path)}`
    );

    const newProduct = new Product({
      ImgURL,
      Size,
      Price,
      DiscountedPrice,
      Sleeve,
      Stock,
      Color,
      CustomizeOption,
    });

    await newProduct.save();

    return apiResponse(
      res,
      true,
      newProduct,
      "Product added successfully",
      201
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id, Size, Price, DiscountedPrice, Stock, Sleeve, Gender, Color } =
      req.body;

    const FoundProduct = await Product.findById(id);

    if (!FoundProduct) {
      return apiResponse(res, false, null, "Product not found", 404);
    }

    if (req.files && req.files.length > 0) {
      if (FoundProduct.ImgURL && FoundProduct.ImgURL.length > 0) {
        deleteFiles(FoundProduct.ImgURL);
      }

      const ImgURL = req.files.map(
        (file) => `/uploads/${path.basename(file.path)}`
      );
      FoundProduct.ImgURL = ImgURL;
    }

    const UpdatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        Size,
        Price,
        DiscountedPrice,
        Sleeve,
        Stock,
        Gender,
        Color,
        ImgURL: FoundProduct.ImgURL,
      },
      { new: true }
    );

    return apiResponse(
      res,
      true,
      UpdatedProduct,
      "Product Updated successfully",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const getAllCustomersOfProduct = async (req, res) => {
  try {
    const { ProductId } = req.body;

    if (!ProductId) {
      return apiResponse(res, false, null, "ProductId is required", 404);
    }

    const productObjectId = new mongoose.Types.ObjectId(ProductId);

    const pipeline = [
      {
        $match: {
          ProductId: productObjectId,
        },
      },
      {
        $sort: {
          orderDate: -1,
        },
      },
      {
        $project: {
          CustomerId: 1,
        },
      },
    ];

    const result = await Order.aggregate(pipeline);

    if (result.length > 0) {
      apiResponse(res, true, result, "Customers fetched successfully", 200);
    } else {
      apiResponse(res, true, null, "No customers found for this product", 204);
    }
  } catch (error) {
    apiResponse(res, false, null, `Error: ${error.message}`, 500);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const {
      Size,
      Sleeve,
      CustomizeOption,
      Color,
      Price,
      Avalibility,
      sortOrder,
    } = req.body;

    const filterQuery = {};

    if (Size && Size.length > 0) {
      filterQuery.Size = { $in: Size };
    }

    if (Sleeve && Sleeve.length > 0) {
      filterQuery.Sleeve = { $in: Sleeve };
    }

    if (CustomizeOption && CustomizeOption.length > 0) {
      filterQuery.CustomizeOption = { $in: CustomizeOption };
    }

    if (Color && Color.length > 0) {
      filterQuery.Color = { $in: Color };
    }

    if (Price && Price.length === 2) {
      filterQuery.Price = { $gte: Price[0], $lte: Price[1] };
    }

    if (Avalibility && !Avalibility.includes("All")) {
      if (Avalibility.includes("Discontinued")) {
        filterQuery.isDiscontinued = true;
      } else if (Avalibility.includes("Available")) {
        filterQuery.isDiscontinued = false;
      }
    }

    const sortOptions = {};
    if (sortOrder === "lowToHigh") {
      sortOptions.Price = 1;
    } else if (sortOrder === "highToLow") {
      sortOptions.Price = -1;
    }

    const Products = await Product.find(filterQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments(filterQuery);

    return apiResponse(
      res,
      true,
      {
        products: Products,
        pagination: {
          totalProducts,
          page,
          limit,
          totalPages: Math.ceil(totalProducts / limit),
        },
      },
      "Products fetched successfully",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const getAllActiveProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { Size, Sleeve, CustomizeOption, Color, Price, sortOrder } = req.body;

    const filterQuery = {
      isDiscontinued: false,
    };

    if (Size && Size.length > 0) {
      filterQuery.Size = { $in: Size };
    }

    if (Sleeve && Sleeve.length > 0) {
      filterQuery.Sleeve = { $in: Sleeve };
    }

    if (CustomizeOption && CustomizeOption.length > 0) {
      filterQuery.CustomizeOption = { $in: CustomizeOption };
    }

    if (Color && Color.length > 0) {
      filterQuery.Color = { $in: Color };
    }

    if (Price && Price.length === 2) {
      filterQuery.Price = { $gte: Price[0], $lte: Price[1] };
    }

    const sortOptions = {};
    if (sortOrder === "lowToHigh") {
      sortOptions.Price = 1;
    } else if (sortOrder === "highToLow") {
      sortOptions.Price = -1;
    }

    const Products = await Product.find(filterQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments(filterQuery);

    return apiResponse(
      res,
      true,
      {
        products: Products,
        pagination: {
          totalProducts,
          page,
          limit,
          totalPages: Math.ceil(totalProducts / limit),
        },
      },
      "Active products fetched successfully",
      200
    );
  } catch (error) {
    console.log(error);
    return apiResponse(res, false, null, error.message, 500);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const singleProduct = await Product.findById(id);

    if (!singleProduct) {
      return apiResponse(res, false, null, "Product not found", 404);
    }

    return apiResponse(
      res,
      true,
      singleProduct,
      "Product fetched successfully",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const disContinueProducts = async (req, res) => {
  try {
    const { Products } = req.body;

    for (const productId of Products) {
      const FoundProduct = await Product.findById(productId);
      if (!FoundProduct) {
        return apiResponse(
          res,
          false,
          null,
          `Product ${productId} not found`,
          404
        );
      }

      FoundProduct.isDiscontinued = true;
      await FoundProduct.save();
    }

    if (Products.length != 1) {
      return apiResponse(
        res,
        true,
        null,
        "Products are discontinued successfully",
        200
      );
    }

    return apiResponse(
      res,
      true,
      null,
      "Product is discontinued successfully",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const reContinueProducts = async (req, res) => {
  try {
    const { Products } = req.body;

    for (const productId of Products) {
      const FoundProduct = await Product.findById(productId);
      if (!FoundProduct) {
        return apiResponse(
          res,
          false,
          null,
          `Product ${productId} not found`,
          404
        );
      }

      FoundProduct.isDiscontinued = false;
      await FoundProduct.save();
    }

    if (Products.length != 1) {
      return apiResponse(
        res,
        true,
        null,
        "Products are recontinued successfully",
        200
      );
    }

    return apiResponse(
      res,
      true,
      null,
      "Product is recontinued successfully",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

export {
  addProduct,
  getAllCustomersOfProduct,
  getAllProducts,
  getAllActiveProducts,
  getSingleProduct,
  updateProduct,
  disContinueProducts,
  reContinueProducts,
};
