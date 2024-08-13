import mongoose, { Schema } from "mongoose";

const clubSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
      default: ""
    },
  },
  {
    timestamps: true,
  }
);

const Club = mongoose.models.Club || mongoose.model("Club", clubSchema);
export default Club;