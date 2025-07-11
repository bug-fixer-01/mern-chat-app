import User from "../models/user.models.js";
import Conversation from "../models/conversation.model.js";

export const getUserForSiderbar = async (req, res) => {
    try {

        const loggedInUsers = req.user._id;

        const fillterdUsers = await User.find({ _id: { $ne: loggedInUsers } }).select("-password")

        res.status(200).json(fillterdUsers)
    }
    catch (error) {
        console.log("error in User controller", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}