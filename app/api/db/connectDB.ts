import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB Terhubung: ${conn.connection.host}`)   
    } catch (error: any) {
        console.log("Gagal Terhubung ke MongoDB", error.message);
        process.exit(1);
    }
}