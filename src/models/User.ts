import mongoose from "mongoose";

interface iUser {
    username: string,
    email: string,
    password: string
}

const userSchema = new mongoose.Schema<iUser>({
    username: {
        type: String,
        required:[true, "username Required !!"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email Required !!"],
        unique: true
    },
    password: {
        type: String,
        required:[true, "password Required !!"],
    },
}, { timestamps: true });

export const User = mongoose.models.users || mongoose.model("users", userSchema); 