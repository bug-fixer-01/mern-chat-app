import express from "express";
import { sendMessage, getMessages,getLastMessage} from "../controller/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/lastMessage",protectRoute,getLastMessage)
router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessage)

export default router;