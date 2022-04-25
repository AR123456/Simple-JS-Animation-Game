import express from "express";
const router = express.Router();
import { authUser } from "../controllers/userController.js";
// go to /login and call authUser
router.post("/login", authUser);

export default router;
