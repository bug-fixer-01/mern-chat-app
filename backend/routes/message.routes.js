import express from "express";
import { sendMessage, getMessages , getLastMessage,editMessage , deleteMessage} from "../controller/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/lastMessage",protectRoute,getLastMessage)
router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessage)
router.put("/edit/:MessageId", protectRoute, editMessage)
router.delete("/delete/:MessageId", protectRoute,deleteMessage);

export default router;