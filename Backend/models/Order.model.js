// https://youtu.be/VbGl3msgce8?list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&t=2866

import mongoose, { model, Schema } from "mongoose";

const OrderSchema = Schema({
  BaseProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  Customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  CustomerImg: {
    type: String,
  },
  Font: {
    type: String,
  },
  Text: {
    type: String,
  },
  Color: {
    type: String,
  },
  FinalProductImg: {
    type: String,
  },
  Quantity: {
    type: Number,
    default: 1,
  },
  FinalCost: {
    type: Number,
    require: true,
  },
  State: {
    type: String,
    enum: ["Process", "Ready", "Shipped", "Completed"],
    default: "Process",
  },
});

const Order = model("Order", OrderSchema);

export default Order;
