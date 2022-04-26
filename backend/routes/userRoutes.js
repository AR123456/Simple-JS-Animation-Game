import express from "express";
const router = express.Router();
import { authUser, getUserProfile } from "../controllers/userController.js";
// go to /login and call authUser
router.post("/login", authUser);
// go to /profile and make get request by calling getUserProfile
router.route("/profile").get(getUserProfile);

export default router;
