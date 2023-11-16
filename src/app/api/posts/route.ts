import { dbConnect } from "@/helpers/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { responseMessage } from "@/helpers/responseMessage";
import { Post } from "@/models/Post";
import { NextResponse, NextRequest } from "next/server";
dbConnect();

export async function GET() {
    try {

        const posts = await Post.find();
        console.log(posts);
        return NextResponse.json({ posts }, { status: 202 })

    } catch (error) {
        console.log(error);
        return responseMessage('failed to get posts', false, 404)
    }
}


export async function POST(request: NextRequest) {


    try {
        const { title, description, paymentType, amount } = await request.json();
        const userId = await getDataFromToken(request)
        // console.log(title, description, paymentType, amount);

        const post = new Post({
            title, description, paymentType, amount, userId
        });

        const savedPost = await post.save();
        // console.log(savedPost);
        return NextResponse.json({ savedPost, success: true }, { status: 202 })

    } catch (error) {
        console.log(error);
        return responseMessage('failed to add post', false, 404);
    }
}