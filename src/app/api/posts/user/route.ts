import { dbConnect } from "@/helpers/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { responseMessage } from "@/helpers/responseMessage";
import { Post } from "@/models/Post";
import { NextResponse, NextRequest } from "next/server";
dbConnect();

// get single user's posts
export async function GET(request: NextRequest, { params }: any) {

    try {
        const userId = await getDataFromToken(request)
        const post = (await Post.find({ userId: userId })).reverse();
        return NextResponse.json({ message: "successfully got posts", post, success: true });
        
    } catch (error) {
        console.log(error);
        return responseMessage("Error in getting post !!", false, 404);
    }
}
