import cookieParser from "cookie-parser";
import express from "express";

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

import userRouter from "./routes/user.route.js"

//routes
app.use("/api/v1/auth", userRouter)

export {app}