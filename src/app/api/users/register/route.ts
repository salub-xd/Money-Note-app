import { dbConnect } from "@/helpers/db";
import { responseMessage } from "@/helpers/responseMessage";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

dbConnect();

export async function POST(request: any) {

    const { username, email, password } = await request.json();
    // console.log(username, email, password);

    try {

        let findUsername = await User.findOne({ username: username });
        if (findUsername) {
            throw new Error("username has been already used by someone else !!")
        }
        let findEmail = await User.findOne({ email: email });
        if (findEmail) {
            throw new Error("email has been already used by someone else !!")
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username: username, email: email, password: hashPassword
        });

        const savedUser = await user.save();
        // console.log(savedUser);
        return NextResponse.json({ message: "signup sucess", success: true }, { status: 202 })

    } catch (error) {
        console.log(error);
        return responseMessage('failed to register user', false, 404);
    }
}