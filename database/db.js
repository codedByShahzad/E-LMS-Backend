import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const mongo_uri = process.env.MONGO_URI

const connectDB = async () => {
    try {
        await mongoose.connect(mongo_uri)
        console.log('Connected to Database Successfully')
    } catch (error) {
        console.log('Error Connecting to the Mongo DB')
    }
}

export default connectDB