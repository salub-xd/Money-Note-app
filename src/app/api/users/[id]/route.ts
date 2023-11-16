import { dbConnect } from "@/helpers/db";
import { responseMessage } from "@/helpers/responseMessage";
import { User } from "@/models/User";
import { NextResponse,NextRequest } from "next/server";
dbConnect();

export async function GET(request: NextRequest, { params }: any) {

    const userId = params.id;

    try {
        const user = await User.findOne({ _id: userId }).select("-password");
        return NextResponse.json({ user });

    } catch (error) {
        console.log(error);
        return responseMessage('failed to get user', false, 404)
    }
}


// Update user

export async function PUT(request: NextRequest, { params }: any) {

    const userId = params.id;
    const { username, email, password } = await request.json();

    try {
        
        const updateUser = await User.findByIdAndUpdate(userId, { $set: { username, email, password } }, { new: true });

        return NextResponse.json({
            message: "user updated !!", updateUser
        });

    } catch (error) {
        console.log(error);
        return responseMessage('failed to update user', false, 404)
    }


}


export async function DELETE(request: NextRequest, { params }: any) {

    const userId = params.id;
    // console.log(userId);

    try {
        const user = await User.findByIdAndDelete(userId);

        return NextResponse.json({
            message: "user deleted !!"
        });

    } catch (error) {
        console.log(error);
        return responseMessage('failed to delete user', false, 404)
    }


}
