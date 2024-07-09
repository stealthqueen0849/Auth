import connectDB from "./db/index.js";
import { app } from "./app.js";

import dotenv from "dotenv"

dotenv.config({
    path:"./.env"
})

const PORT = process.env.PORT || 5000;
connectDB()
    .then(()=>{
        app.listen(PORT, () => {
            console.log("Server is running on port ", PORT);
        })
    })
    .catch((err) => {
        console.log("Error while listening on port!! ", err.message);
    })


