import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/db.js"
dotenv.config()

const port = process.env.PORT

const app = express()

app.listen(()=>{

    try {
        console.log(`Server is Running on Port ${port}`)
    connectDB()
    } catch (error) {
        console.log(`Cannot Connect to Server || Error Connecting to the Server`)
    }

    
})