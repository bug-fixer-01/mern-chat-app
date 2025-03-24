import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.routes.js"
import MessageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import { getLastMessage } from "./controller/message.controller.js"
import { app, server } from "./socket/socket.js"

import connectToMongoDb from "./db/connectToDatabase.js";


dotenv.config();


const PORT = process.env.PORT || 5000;


app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/message",MessageRoutes);
app.use("/api/Users", userRoutes);


server.listen(PORT, () => {
    connectToMongoDb();
    console.log(`server started at ${PORT}`);
    getLastMessage();
})     