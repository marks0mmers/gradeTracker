import { Document, model, Schema } from "mongoose";
import { GradeDTO } from "../grade/grade.schema";

export interface GradeCategoryDTO {
    _id: string;
    title: string;
    percentage: number;
    numberOfGrades: number;
    courseId: string;
    grades: GradeDTO[];
}

export interface GradeCategoryDocument extends Document {
    _id: string;
    title: string;
    percentage: number;
    numberOfGrades: number;
    courseId: string;
    grades: any[];
}

const gradeCategorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    numberOfGrades: {
        type: Number,
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    grades: [
        { type: Schema.Types.ObjectId, ref: "Grade" }
    ]
});

export const gradeCategoryDatabase = model<GradeCategoryDocument>("GradeCategory", gradeCategorySchema);
