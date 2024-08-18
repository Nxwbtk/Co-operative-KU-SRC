import mongoose, { Schema } from "mongoose";

const faculty = new Schema({
    name: {
        type: String,
        required: true,
    },
    majors: {
        type: [String],
        required: false,
        default: [],
    }
},
{
    timestamps: true,
}
);

const Faculty = mongoose.models.Faculty || mongoose.model("Faculty", faculty);
export default Faculty;