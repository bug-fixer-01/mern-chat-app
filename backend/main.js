import path from 'path'
import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.routes.js"
import MessageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import { app, server } from "./socket/socket.js"

import connectToMongoDb from "./db/connectToDatabase.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes)
app.use("/api/message",MessageRoutes);
app.use("/api/Users", userRoutes);


app.use(express.static(path.join(__dirname,"frontend","dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend", "dist","index.html"));
})


server.listen(PORT, () => {
    connectToMongoDb();
    console.log(`server started at ${PORT}`);
    console.log(__dirname)
})     