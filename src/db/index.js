import mongoose from "mongoose";
import DB_NAME from "../constants.js"
import dotenv from "dotenv";

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("Connected to mongoDB!")
    } catch (error) {
        console.log("Error while connecting to monogoDB, ", error.message)
    }
}

export default connectDB;