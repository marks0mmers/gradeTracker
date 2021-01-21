import { Document, model, Schema } from "mongoose";

export interface CourseDTO {
    _id: string;
    title: string;
    description: string;
    section: number;
    creditHours: number;
    userId: string;
}

export interface CourseDocument extends Document {
    _id: string;
    title: string;
    description: string;
    section: number;
    creditHours: number;
    userId: string;
}

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    section: {
        type: Number,
        required: true
    },
    creditHours: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

export const courseDatabase = model<CourseDocument>("Course", courseSchema);
