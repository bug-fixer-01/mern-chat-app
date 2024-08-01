import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserForSiderbar } from "../controller/user.controller.js";

const router = express.Router();

router.get("/",protectRoute, getUserForSiderbar)

export default router;