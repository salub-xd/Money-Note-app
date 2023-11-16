import mongoose from "mongoose";

interface iPost {
    title?: string,
    description?: string,
    paymentType: string,
    amount: string,
    userId: any,
}

const postSchema = new mongoose.Schema<iPost>({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    paymentType: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true
    }
}, { timestamps: true });

export const Post = mongoose.models.posts || mongoose.model("posts", postSchema);