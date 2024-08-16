import mongoose, { Schema } from "mongoose";

const faculty = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
}
);

const Faculty = mongoose.models.Faculty || mongoose.model("Faculty", faculty);
export default Faculty;