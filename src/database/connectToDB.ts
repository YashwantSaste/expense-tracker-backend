import mongoose from "mongoose";
import dotenv  from "dotenv";
export const connectToDatabse = async():Promise<void>=>{
    dotenv.config();
    const MONGO_URI= process.env.MONGO_URI;
    if (!MONGO_URI) {
        throw new Error("MONGO_URI is not defined in the environment variables");
    }
    try{
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Database connected successfully");
    }catch(error){
        console.log("Database connection failed",error);
        process.exit(1);
    }
};

