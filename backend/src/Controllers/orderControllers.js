import Order from "../models/orderModel.js";
import { connectRedis } from "../config/redisConnection.js";
import apiResponse from "../utils/apiResponse.js";
import productValidate from "../utils/productValidate.js";
import { sendOrderConfirmationEmail } from "../utils/sendMail.js";
import deleteFiles from "../utils/deleteFiles.js";

const addOrder = async (req, res) => {
  try {
    const { CustomizedType, Quantity, FinalCost, ProductId } = req.body;

    const FinalProductImg = `/uploads/${req.files.FinalProductImg[0].filename}`;

    const CustomerId = req.user._id;

    if (!CustomizedType) {
      return apiResponse(res, false, null, "CustomizedType is required", 400);
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

    if (CustomizedType === "Text") {
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
        CustomizedType: "Text",
      });

      await newOrder.save();

      await sendOrderConfirmationEmail(
        Email,
        FullName,
        [newOrder],
        [FinalProductImg]
      );

      return apiResponse(res, true, newOrder, "Order is Successfully placed");
    } else if (CustomizedType === "Photo") {
      if (!req.files.CustomerImg[0]) {
        return apiResponse(
          res,
          false,
          null,
          "Customer Img is not itreble",
          400
        );
      }
      const CustomerImg = `/uploads/${req.files.CustomerImg[0].filename}`;

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
        CustomizedType: "Photo",
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
    } else if (CustomizedType === "Both") {
      const { Font, Text, Color, TextStyle } = req.body;
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
        CustomizedType: "Both",
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
    console.log(error.message);
    return apiResponse(res, false, null, error.message, 500);
  }
};

const addToCartOrder = async (req, res) => {
  try {
    const { CustomizedType, Quantity, FinalCost, ProductId } = req.body;
    const FinalProductImg = `/uploads/${req.files.FinalProductImg[0].filename}`;

    const CustomerId = req.user._id;

    if (!CustomizedType) {
      return apiResponse(res, false, null, "CustomizedType is required", 400);
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

    if (CustomizedType === "Text") {
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
        CustomizedType: "Text",
      });

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
    } else if (CustomizedType === "Photo") {
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
        CustomizedType: "Photo",
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
          CustomizedType,
        },
        `Order is successfully added to cart`,
        200
      );
    } else if (CustomizedType === "Both") {
      const { Font, Text, Color, TextStyle } = req.body;
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
        CustomizedType: "Both",
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
        CustomizedType: "Both",
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
          CustomizedType: "Both",
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

    await redisClient.hSet(orderKey, "Quantity", Quantity);

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

    for (const orderKey of orderKeys) {
      if (!orderKey) {
        return apiResponse(res, false, null, "OrderKey is required", 400);
      }

      const redisClient = await connectRedis();

      await redisClient.del(orderKey);
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
    const { orderKeys } = req.body;
    const CustomerId = req.user._id;
    const redisClient = await connectRedis();
    const Orders = [];

    const { Email, FullName } = req.user;

    for (const orderKey of orderKeys) {
      const orderData = await redisClient.hGetAll(orderKey);

      if (!orderData || Object.keys(orderData).length === 0) {
        continue;
      }
      const {
        ProductId,
        CustomerImg = "",
        Font = "",
        TextStyle = "",
        Text = "",
        Color = "",
        Quantity = 1,
        FinalCost,
        FinalProductImg = "",
        CustomizedType = "",
      } = orderData;

      if (CustomizedType == "Photo") {
        const newOrder = new Order({
          ProductId,
          CustomerImg,
          CustomerId,
          Quantity,
          FinalCost,
          FinalProductImg,
          CustomizedType,
        });
        const SavedOrder = await newOrder.save();
        Orders.push(SavedOrder);

        await redisClient.del(orderKey);
      } else if (CustomizedType == "Text") {
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
          CustomizedType,
        });
        const SavedOrder = await newOrder.save();
        Orders.push(SavedOrder);

        await redisClient.del(orderKey);
      } else {
        const newOrder = new Order({
          ProductId,
          CustomerId,
          CustomerImg,
          Font,
          TextStyle,
          Text,
          Color,
          FinalProductImg,
          Quantity: Number(Quantity),
          FinalCost: Number(FinalCost),
          CustomizedType,
        });

        const SavedOrder = await newOrder.save();
        Orders.push(SavedOrder);

        await redisClient.del(orderKey);
      }
    }

    if (Orders.length == 0) {
      return apiResponse(res, false, null, "Orders can not be Empty", 400);
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
