import mongoose from "mongoose";

export async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL!, {
            dbName: "advanceNote-app"
        })
        console.log("DB connected successfully");

    } catch (error) {
        console.log("DB failed to connect");
    }
}