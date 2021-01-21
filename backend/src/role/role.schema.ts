import { Document, model, Schema } from "mongoose";

export interface RoleDTO {
    _id: string;
    role: string;
    userId: string;
}

export interface RoleDocument extends Document {
    _id: string;
    role: string;
    userId: string;
}

const roleSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
});

export const roleDatabase = model<RoleDocument>("Role", roleSchema);
