import { dbConnect } from "@/helpers/db";
import { responseMessage } from "@/helpers/responseMessage";
import { User } from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

dbConnect();

export async function GET(request: NextRequest) {
    try {

        const authToken = request.cookies.get("authToken")?.value;
        const data = jwt.verify(authToken!, process.env.JWT_KEY!);
        const user = await User.findById(data).select("-password");
        return NextResponse.json(user);
        
    } catch (error) {
        console.log(error);
        return responseMessage('failed to login user', false, 404);
    }
}
