import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const protectRoute = async (req, res, next) => {
    try {

        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: "no token provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        if (!decoded) {
            return res.status(401).json({ error: "Invalid Token" })
        }

        const user = await User.findById(decoded.UserId).select("-password")

        if (!user) {
            return res.status(401).json({ error: "user not found" })
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("error in message controller", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}


export default protectRoute;