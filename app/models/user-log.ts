import mongoose, { Schema } from "mongoose";

const userLogSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    loginTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
    logoutTime: {
      type: Date,
      required: false,
      default: null
    },
  },
  {
    timestamps: true,
  }
);

const UserLog = mongoose.models.UserLog || mongoose.model("UserLog", userLogSchema);
export default UserLog;