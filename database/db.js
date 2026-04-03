import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const mongo_uri = process.env.MONGO_URI

const connectDB = async () => {
    await mongoose.connect(mongo_uri)
}

export default connectDB