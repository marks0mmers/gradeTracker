import { Document, model, Schema } from "mongoose";

export interface GradeDTO {
    _id: string;
    name: string;
    grade: number;
    gradeCategoryId: string;
}

export interface GradeDocument extends Document {
    _id: string;
    name: string;
    grade: number;
    gradeCategoryId: string;
}

const gradeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    gradeCategoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "GradeCategory"
    }
});

export const gradeDatabase = model<GradeDocument>("Grade", gradeSchema);
