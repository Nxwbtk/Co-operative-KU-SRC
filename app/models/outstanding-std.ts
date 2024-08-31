import mongoose, { Schema } from "mongoose";

const outStdNisit = new Schema(
  {
    academic_year: {
      type: String,
      required: true,
    },
    honorific: {
      type: String,
      required: false,
      default: "",
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    major_id: {
      type: String,
      required: true,
    },
    type_of_award_id: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const OutStandingNisit =
  mongoose.models.outstanding_students ||
  mongoose.model("outstanding_students", outStdNisit);
export default OutStandingNisit;
