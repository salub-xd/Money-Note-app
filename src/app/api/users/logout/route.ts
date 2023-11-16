import { dbConnect } from "@/helpers/db";
import { responseMessage } from "@/helpers/responseMessage";
import { NextResponse } from "next/server";

dbConnect();

export async function GET() {
    try {

        const response = NextResponse.json({
            message: "Logout successful",
            status: 200
        });
        response.cookies.set("authToken", "", {
            expires: new Date(0),
            httpOnly: true
        });
        return response;
        // return NextResponse.json({ message: 'successfully logout user', success: true });

    } catch (error) {
        console.log(error);
        return responseMessage('failed to logout user', false, 404);
    }
}
