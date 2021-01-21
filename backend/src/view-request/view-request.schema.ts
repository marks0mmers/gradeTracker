import { Document, model, Schema } from "mongoose";
export interface ViewRequestDTO {
    _id?: string;
    status: number;
    requester: string;
    receiver: string;
}

export interface ViewRequestDocument extends Document {
    _id: string;
    status: number;
    requester: string;
    receiver: string;
}

const viewRequestSchema = new Schema({
    status: {
        type: Number,
        required: true,
        min: 0,
        max: 2
    },
    requester: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    }
});

export const viewRequestDatabase = model<ViewRequestDocument>("ViewRequest", viewRequestSchema);
