import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { signup,login,logout } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signup)

router.post("/login",login)

router.post("/logout", logout)

router.post("/upload-image", upload.single("image"),(req,res) =>{
    if(!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    };
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    console.log(imageUrl)
    return res.status(201).json({ imageUrl, uu:"hello" });
})


export default router