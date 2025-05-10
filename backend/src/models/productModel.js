import { model, Schema, Types } from "mongoose";

const ProductSchema = new Schema(
  {
    ImgURL: {
      type: [String],
      required: false,
    },
    SizeStock: {
      type: Map,
      of: Number, // value is stock number
      default: {},
      validate: {
        validator: function (value) {
          // Ensure only allowed sizes are used
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
    Price: {
      type: Number,
      required: true,
    },
    DiscountedPrice: {
      type: Number,
    },
    Sleeve: {
      type: String,
      enum: ["Full Sleeve", "Half Sleeve", "Sleeveless"],
      required: true,
    },
    Color: {
      type: String,
      required: true,
    },
    CustomizeOption: {
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
