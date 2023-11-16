import { NextResponse } from "next/server";

export async function responseMessage(message: string, successStatus: boolean, statusCode: number) {
    return NextResponse.json({ message: message, success: successStatus }, { status: statusCode })
}