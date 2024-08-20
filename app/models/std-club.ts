import mongoose, { Schema } from 'mongoose';

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
    clubPosition: {
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
      required: false,
      default: '',
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
  },
  {
    timestamps: true,
  }
);

const StudentClub = mongoose.models.StudentClub || mongoose.model('StudentClub', clubSchema);
export default StudentClub;