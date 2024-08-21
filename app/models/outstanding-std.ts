import mongoose, { Schema } from "mongoose";

const outstdStu = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  typeOfOutstanding: {
    type: String,
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
    default: '',
  },
  faculty: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
}
);

const OutstandingStudent = mongoose.models.OutstandingStudent || mongoose.model('OutstandingStudent', outstdStu);
export default OutstandingStudent;

