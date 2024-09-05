import mongoose, { Schema } from "mongoose";

const major = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Major = mongoose.models.Major || mongoose.model("Major", major);
export default Major;
