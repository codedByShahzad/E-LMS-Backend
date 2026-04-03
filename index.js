import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/db.js"
dotenv.config()

import userRoute from "./routes/user.route.js"

const port = process.env.PORT

const app = express()

app.use(express.json());

//Apis

app.use("/api/v1/user", userRoute)

app.get("/", (_, res)=>{
    res.status(200).json({
        success: true,
        message: "Hello I am From Backend"
    })
})



connectDB()
  .then(() => {
    console.log("Database Connection estblished... ");
    app.listen(port, () => {
      console.log(`Server Successfully Listening on Port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Database Cannot be Connected", err.message);
  });
