import mongoose, { Schema } from "mongoose";

const otp = new Schema({
    otp: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: "3m" },
    },
    isUsed: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true,
    }
);

const OTP = mongoose.models.otp || mongoose.model("otp", otp);
export default OTP;