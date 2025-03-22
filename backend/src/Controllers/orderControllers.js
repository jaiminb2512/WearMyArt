import Order from "../models/orderModel.js";
import { connectRedis } from "../config/redisConnection.js";
import apiResponse from "../utils/apiResponse.js";
import productValidate from "../utils/productValidate.js";
import { sendOrderConfirmationEmail } from "../utils/sendMail.js";
import deleteFiles from "../utils/deleteFiles.js";

const addOrder = async (req, res) => {
  try {
    const { CustomizeOption, Quantity, FinalCost, ProductId } = req.body;
    const FinalProductImg = `/uploads/${req.files["FinalProductImg"][0].filename}`;
    const CustomerId = req.user._id;

    if (!CustomizeOption) {
      return apiResponse(res, false, null, "CustomizeOption is required", 400);
    }
    const { Size } = productValidate(ProductId, res, Quantity);

    if (!FinalProductImg) {
      return apiResponse(
        res,
        false,
        null,
        "Final Product Image is required",
        400
      );
    }

    if (!FinalCost) {
      return apiResponse(res, false, null, "FinalCost is required", 400);
    }

    const { Email, FullName } = req.user;

    if (CustomizeOption === "Text") {
      const { Font, Text, Color, TextStyle } = req.body;

      const newOrder = new Order({
        ProductId,
        CustomerId,
        Font,
        TextStyle,
        Text,
        Color,
        Quantity,
        FinalCost,
        FinalProductImg,
        CustomizeOption: "Text",
      });

      await newOrder.save();

      await sendOrderConfirmationEmail(
        Email,
        FullName,
        [newOrder],
        [FinalProductImg]
      );

      return apiResponse(res, true, newOrder, "Order is Successfully placed");
    } else if (CustomizeOption === "Photo") {
      const CustomerImg = `/uploads/${req.files["CustomerImg"][0].filename}`;

      if (!CustomerImg) {
        return apiResponse(res, false, null, "Customer Img is required", 400);
      }

      const newOrder = new Order({
        ProductId,
        CustomerImg,
        CustomerId,
        Quantity,
        FinalCost,
        FinalProductImg,
        CustomizeOption: "Photo",
      });

      await newOrder.save();

      await sendOrderConfirmationEmail(
        Email,
        FullName,
        [newOrder],
        [FinalProductImg]
      );

      return apiResponse(
        res,
        true,
        newOrder,
        "Order is Successfully placed",
        200
      );
    } else if (CustomizeOption === "Both") {
      const { Font, Text, Color, TextStyle } = req.body;
      const FinalProductImg = `/uploads/${req.files["FinalProductImg"][0].filename}`;
      const CustomerImg = `/uploads/${req.files["CustomerImg"][0].filename}`;

      if (!CustomerImg && !FinalProductImg) {
        return apiResponse(
          res,
          false,
          null,
          "Customer Img and Final Product Image is required",
          400
        );
      }

      if (!CustomerImg && FinalProductImg) {
        return apiResponse(res, false, null, "Customer Img is required", 400);
      }

      if (!FinalProductImg) {
        deleteFiles([`/uploads/${req.files["CustomerImg"][0].filename}`]);
        return apiResponse(
          res,
          false,
          null,
          "Final Product Image is required",
          400
        );
      }

      const newOrder = new Order({
        ProductId,
        CustomerImg,
        CustomerId,
        Quantity,
        FinalCost,
        FinalProductImg,
        Font,
        TextStyle,
        Text,
        Color,
        CustomizeOption: "Both",
      });

      await newOrder.save();

      await sendOrderConfirmationEmail(
        Email,
        FullName,
        [newOrder],
        [FinalProductImg]
      );

      return apiResponse(
        res,
        true,
        newOrder,
        "Order is Successfully placed",
        200
      );
    }
  } catch (error) {
    deleteFiles([
      `/uploads/${req.files["FinalProductImg"][0].filename}`,
      `/uploads/${req.files["CustomerImg"][0].filename}`,
    ]);
    console.log(error.message);
    return apiResponse(res, false, null, error.message, 500);
  }
};

const addToCartOrder = async (req, res) => {
  try {
    const { CustomizeOption, Quantity, FinalCost, ProductId } = req.body;
    console.log(req.files.FinalProductImg[0].filename);
    const FinalProductImg = `/uploads/${req.files.FinalProductImg[0].filename}`;

    const CustomerId = req.user._id;

    if (!CustomizeOption) {
      return apiResponse(res, false, null, "CustomizeOption is required", 400);
    }
    const { Size } = productValidate(ProductId, res, Quantity);

    if (!FinalProductImg) {
      return apiResponse(res, false, null, "FinalProductImg is required", 400);
    }
    if (!FinalCost) {
      return apiResponse(res, false, null, "FinalCost is required", 400);
    }

    await productValidate(ProductId, res, Quantity);

    const redisClient = await connectRedis();

    if (CustomizeOption === "Text") {
      const { Font, TextStyle, Text, Color } = req.body;

      if (!(ProductId || Font || TextStyle || Text || Color)) {
        return apiResponse(res, false, null, "All fields are required", 400);
      }

      const newOrderKey = `order:${CustomerId}:${Date.now()}`;

      await redisClient.hSet(newOrderKey, {
        ProductId: String(ProductId),
        CustomerId: String(CustomerId),
        Font: String(Font || ""),
        TextStyle: String(TextStyle || ""),
        Text: String(Text || ""),
        Color: String(Color || ""),
        Quantity: Number(Quantity) || 1,
        FinalCost: Number(FinalCost),
        FinalProductImg: String(FinalProductImg || ""),
        CustomizeOption: "Text",
      });

      console.log("here is the order");
      return apiResponse(
        res,
        true,
        {
          OrderKey: newOrderKey,
          ProductId,
          Font,
          TextStyle,
          Text,
          Color,
          Quantity,
          FinalCost,
          FinalProductImg,
        },
        `Order is successfully added to cart`,
        200
      );
    } else if (CustomizeOption === "Photo") {
      const CustomerImg = `/uploads/${req.files.CustomerImg[0].filename}`;

      if (!CustomerImg) {
        return apiResponse(res, false, null, "Customer Img is required", 400);
      }

      const newOrderKey = `order:${CustomerId}:${Date.now()}`;
      await redisClient.hSet(newOrderKey, {
        ProductId: String(ProductId),
        CustomerImg: String(CustomerImg || ""),
        CustomerId: String(CustomerId),
        Quantity: Number(Quantity) || 1,
        FinalCost: Number(FinalCost),
        FinalProductImg: String(FinalProductImg || ""),
        CustomizeOption: "Photo",
      });

      return apiResponse(
        res,
        true,
        {
          OrderKey: newOrderKey,
          ProductId,
          CustomerImg,
          CustomerId,
          Quantity,
          FinalCost,
          FinalProductImg,
          CustomizeOption,
        },
        `Order is successfully added to cart`,
        200
      );
    } else if (CustomizeOption === "Both") {
      const { Font, Text, Color, TextStyle } = req.body;
      const FinalProductImg = `/uploads/${req.files.FinalProductImg[0].filename}`;
      const CustomerImg = `/uploads/${req.files.CustomerImg[0].filename}`;

      if (!CustomerImg && !FinalProductImg) {
        return apiResponse(
          res,
          false,
          null,
          "Customer Img and Final Product Image is required",
          400
        );
      }

      if (!CustomerImg && FinalProductImg) {
        return apiResponse(res, false, null, "Customer Img is required", 400);
      }

      if (!FinalProductImg) {
        deleteFiles([`/uploads/${req.files.CustomerImg[0].filename}`]);
        return apiResponse(
          res,
          false,
          null,
          "Final Product Image is required",
          400
        );
      }

      const newOrderKey = `order:${CustomerId}:${Date.now()}`;
      await redisClient.hSet(newOrderKey, {
        ProductId: String(ProductId),
        CustomerImg: String(CustomerImg || ""),
        CustomerId: String(CustomerId),
        Quantity: Number(Quantity) || 1,
        FinalCost: Number(FinalCost),
        FinalProductImg: String(FinalProductImg || ""),
        Font: String(Font || ""),
        TextStyle: String(TextStyle || ""),
        Text: String(Text || ""),
        Color: String(Color || ""),
        CustomizeOption: "Both",
      });

      const newOrder = new Order({
        ProductId,
        CustomerImg,
        CustomerId,
        Quantity,
        FinalCost,
        FinalProductImg,
        Font,
        TextStyle,
        Text,
        Color,
        CustomizeOption: "Both",
      });

      return apiResponse(
        res,
        true,
        {
          OrderKey: newOrderKey,
          ProductId,
          CustomerImg,
          CustomerId,
          Quantity,
          FinalCost,
          FinalProductImg,
          Font,
          TextStyle,
          Text,
          Color,
          CustomizeOption: "Both",
        },
        "Order is Successfully placed",
        200
      );
    }
  } catch (error) {
    // if (req.files?.CustomerImg[0]?.filename) {
    //   deleteFiles([
    //     `/uploads/${req.files.FinalProductImg[0].filename}`,
    //     `/uploads/${req.files.CustomerImg[0].filename}`,
    //   ]);
    // } else {
    //   deleteFiles([`/uploads/${req.files.FinalProductImg[0].filename}`]);
    // }
    console.log(error.message);
    return apiResponse(res, false, null, error.message, 500);
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const { orderKey, Quantity } = req.body;

    if (!Quantity) {
      return apiResponse(res, false, null, "Quantity is required", 400);
    }

    if (Quantity < 1) {
      return apiResponse(
        res,
        false,
        null,
        "Quantity must be greater than or equal to 1",
        400
      );
    }

    if (!orderKey) {
      return apiResponse(res, false, null, "orderKey is required", 400);
    }

    const redisClient = await connectRedis();

    await redisClient.hSet("cart", orderKey, Quantity);

    return apiResponse(
      res,
      true,
      { orderKey, Quantity },
      "Cart updated successfully",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const removeCart = async (req, res) => {
  try {
    const { orderKeys } = req.body;

    for (const orderKey in orderKeys) {
      if (!orderKey) {
        return apiResponse(res, false, null, "OrderKey is required", 400);
      }

      const redisClient = await connectRedis();

      const exists = await redisClient.hExists("cart", orderKey);
      if (!exists) {
        return apiResponse(res, false, null, "Order not found in cart", 404);
      }

      await redisClient.hDel("cart", orderKey);
    }

    return apiResponse(
      res,
      true,
      { orderKeys },
      "Cart item removed successfully",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const cartToOrder = async (req, res) => {
  try {
    const { keys } = req.body;
    const CustomerId = req.user._id;
    const redisClient = await connectRedis();
    const Orders = [];

    const { Email, FullName } = req.user;

    for (const key of keys) {
      const orderData = await redisClient.hGetAll(key);

      if (!orderData || Object.keys(orderData).length === 0) {
        continue;
      }

      const {
        ProductId,
        CustomerImg = "",
        Font = "",
        TextStyle = "",
        FontSize = 0,
        Text = "",
        Color = "",
        Quantity = 1,
        FinalCost,
        FinalProductImg = "",
      } = orderData;

      const newOrder = new Order({
        ProductId,
        CustomerId,
        CustomerImg,
        Font,
        TextStyle,
        FontSize: Number(FontSize),
        Text,
        Color,
        FinalProductImg,
        Quantity: Number(Quantity),
        FinalCost: Number(FinalCost),
        Status: "Process",
      });

      const SavedOrder = await newOrder.save();
      Orders.push(SavedOrder);

      await redisClient.del(key);
    }

    await sendOrderConfirmationEmail(
      Email,
      FullName,
      Orders,
      Orders.map((order) => order.FinalProductImg)
    );

    return apiResponse(res, true, Orders, "Orders successfully purchased", 200);
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const getAllCartOrder = async (req, res) => {
  try {
    const CustomerId = req.user._id;

    const redisClient = await connectRedis();

    const keys = await redisClient.keys(`order:${CustomerId}:*`);

    const orders = [];

    for (const key of keys) {
      const orderData = await redisClient.hGetAll(key);

      if (orderData.CustomerId === String(CustomerId)) {
        orders.push({
          key,
          orderData,
        });
      }
    }

    return apiResponse(
      res,
      true,
      orders,
      `Cart Orders fetched successfully`,
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find({});
    // .populate("ProductId")
    // .populate("CustomerId")
    // .exec();

    return apiResponse(
      res,
      true,
      orders,
      "All Orders Fetched Successfully",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const SingleOrder = await Order.findById(id);

    const populatedOrder = await Order.findById(SingleOrder._id)
      .populate("ProductId")
      .populate("CustomerId")
      .exec();

    return apiResponse(
      res,
      true,
      populatedOrder,
      "Product Fetched successfully",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return apiResponse(res, false, null, "Order not found", 404);
    }

    order.status = status;
    const updatedOrder = await order.save();

    return apiResponse(
      res,
      true,
      updatedOrder,
      `Order status updated to '${status}' successfully`,
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

export {
  addOrder,
  addToCartOrder,
  cartToOrder,
  getAllCartOrder,
  getAllOrder,
  getSingleOrder,
  updateOrderStatus,
  updateCartQuantity,
  removeCart,
};
