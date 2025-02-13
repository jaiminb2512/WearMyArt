import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  FullName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  OTP: {
    type: Number,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  OTPExpiry: {
    type: Date,
  },
});

const User = model("User", UserSchema);

export default User;
