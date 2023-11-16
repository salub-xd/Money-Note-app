import { dbConnect } from "@/helpers/db";
import { responseMessage } from "@/helpers/responseMessage";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
dbConnect();

export async function GET() {
    try {

        const users = await User.find();
        console.log(users);
        return NextResponse.json({ users }, { status: 202 })

    } catch (error) {
        console.log(error);
        return responseMessage('failed to get users', false, 404)
    }
}