import mongoose, { Schema } from "mongoose";

const typeOfAward = new Schema(
  {
    name: {
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

const TypeOfAward = mongoose.models.TypeOfAward || mongoose.model("TypeOfAward", typeOfAward);
export default TypeOfAward;