import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function getDataFromToken(request: NextRequest) {
    try {
        const token = request.cookies.get("authToken")?.value || '';
        const decodedToken: any = jwt.verify(token, process.env.JWT_KEY!);
        // console.log(
        //     decodedToken._id
        // );
        
        return decodedToken._id;

    } catch (error: any) {

        console.log(error);

        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}