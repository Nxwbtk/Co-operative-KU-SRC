import mongoose, { Schema } from "mongoose";

const outstdStu = new Schema(
  {
    academicYear: {
      type: String,
      required: true,
    },
    data: [
      {
        typeOfOutstanding: {
          type: String,
          required: true,
        },
        nisitData: {
          type: [
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
              majorId: {
                type: String,
                required: true,
              },
              year: {
                type: String,
                required: true,
              },
            },
          ],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const OutstandingStudent =
  mongoose.models.OutstandingStudent ||
  mongoose.model("OutstandingStudent", outstdStu);
export default OutstandingStudent;
