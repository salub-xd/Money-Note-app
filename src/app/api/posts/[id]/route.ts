import { dbConnect } from "@/helpers/db";
import { responseMessage } from "@/helpers/responseMessage";
import { Post } from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";
dbConnect();

// get single posts
export async function GET(request: NextRequest, { params }: any) {
    const { id } = params;

    try {
        const post = await Post.findById(id);
        return NextResponse.json({ post, success: true });
    } catch (error) {
        console.log(error);
        return responseMessage("Error in getting post !!", false, 404);
    }
}

export async function PUT(request: NextRequest, { params }: any) {
    const { id } = params;
    const { title, description, paymentType, amount } = await request.json();

    try {
        const updatedPost = await Post.findByIdAndUpdate(id, { $set: { title, description, paymentType, amount } }, { new: true });
        return NextResponse.json(updatedPost);

    } catch (error) {
        console.log(error);
        return responseMessage("Error in updating Post !! ", false, 404);
    }
}

export async function DELETE(request: NextRequest, { params }: any) {
    try {
        const { id } = params;

        await Post.deleteOne({
            _id: id,
        });
        return responseMessage("Post Deleted !!", true, 202);
    } catch (error) {
        console.log(error);
        return responseMessage("Error in deleting post !", false, 404);
    }
}

