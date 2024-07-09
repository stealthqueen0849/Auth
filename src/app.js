import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express()
app.use(cors({
    origin:process.env.CORS_NAME,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())


//routes
import userRouter from "./routes/user.routes.js"

app.use("/api/v1/auth", userRouter)

export {app}