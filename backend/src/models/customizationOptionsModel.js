import { Schema, model } from "mongoose";

const CustomizationOptionsSchema = new Schema({
  fontOptions: {
    type: Map,
    of: Number,
    required: true,
  },
  textStyles: {
    type: Map,
    of: Number,
    // Bold, Italic, Underline, Regular
  },
});

const CustomizationOptions = model(
  "CustomizationOptions",
  CustomizationOptionsSchema
);

export default CustomizationOptions;
