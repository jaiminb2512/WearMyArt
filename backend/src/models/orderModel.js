import mongoose, { model, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    ProductId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    CustomerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    CustomerImg: {
      type: String,
    },
    Font: {
      type: String,
    },
    TextStyle: {
      type: String,
    },
    FontSize: {
      type: Number,
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
    },
    Status: {
      type: String,
      enum: ["Pending", "Process", "Ready", "Shipped", "Completed", "Rejected"],
      default: "Pending",
    },
    CustomizeOption: {
      type: String,
      enum: ["Photo", "Text", "Both"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", OrderSchema);

export default Order;
