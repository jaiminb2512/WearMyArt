import { model, Schema, Types } from "mongoose";

const ProductSchema = new Schema(
  {
    imgURL: {
      type: [String],
      required: false,
    },
    sizeStock: {
      type: Map,
      of: Number, 
      default: {},
      validate: {
        validator: function (value) {
          const validSizes = ["S", "M", "L", "XL", "XXL"];
          return Array.from(value.keys()).every((size) =>
            validSizes.includes(size)
          );
        },
        message: (props) =>
          `Invalid size key detected in SizeStock: ${Array.from(
            props.value.keys()
          )
            .filter((k) => !["S", "M", "L", "XL", "XXL"].includes(k))
            .join(", ")}`,
      },
    },
    price: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
    },
    sleeve: {
      type: String,
      enum: ["Full Sleeve", "Half Sleeve", "Sleeveless"],
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    customizeOption: {
      type: String,
      enum: ["Photo", "Text", "Both"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    maxEditingCost: {
      type: Number,
      required: true,
    },
    otherDetails: {
      type: Map,
      of: Number,
      default: {},
    },
    isDiscontinued: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        type: Types.ObjectId,
        ref: "Comment",
      },
    ],
    ratingRef: {
      type: Types.ObjectId,
      ref: "Ratings",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },
    noOfRatings: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Product = model("Product", ProductSchema);

export default Product;
