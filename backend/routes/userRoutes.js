import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/userController.js";
// middle ware to validate token
import { protect } from "../middleware/authMiddleware.js";
// register user route
router.route("/").post(registerUser);
// go to /login and call authUser
router.post("/login", authUser);
// go to /profile and make get request by calling getUserProfile
// router.route("/profile").get(getUserProfile);
// to implement the protect middleware pass it in as the first arg
router.route("/profile").get(protect, getUserProfile);

export default router;
