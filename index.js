import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/db.js"
dotenv.config()

import userRoute from "./routes/user.route.js"
import cookieParser from "cookie-parser"
import cors from "cors";
import courseRoutes from "./routes/course.route.js"

const port = process.env.PORT

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}));

//Apis

app.use("/api/v1/user", userRoute)

app.use("/api/v1/course", courseRoutes)


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
