import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    honorific: {
      type: String,
      required: false,
      default: "",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: [String],
      required: true,
      default: ["ADMIN", "SUPER_ADMIN"],
    },
    image: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
