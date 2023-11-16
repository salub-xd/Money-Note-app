import { dbConnect } from "@/helpers/db";
import { responseMessage } from "@/helpers/responseMessage";
import { User } from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(request: NextRequest) {

    const { email, password } = await request.json();
    // console.log(email, password);

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            // throw new Error("No user found !!");
            return responseMessage('No user found !!', false, 404);
        }
        const matchedPass = bcryptjs.compareSync(password, user.password);
        if (!matchedPass) {
            // throw new Error("password not matched !!");
            return responseMessage('Password not matched !!', false, 404);
        }

        const token = jwt.sign({ _id: user._id, username: user.username, }, process.env.JWT_KEY!);

        // 4.create nextresponse -- cookie

        const response = NextResponse.json({ message: "login sucess", success: true }, { status: 202 });

        response.cookies.set("authToken", token, {
            httpOnly: true,
            expiresIn: "1d",
        });

        // const { password, ...userInfo } = user._doc;
        // console.log(user);
        // console.log("token" + token);
        return response;

    } catch (error) {
        console.log(error);
        return responseMessage('failed to login user', false, 404)
    }
}