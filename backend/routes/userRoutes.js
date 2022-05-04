import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
// middle ware to validate token
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);

router.post("/login", authUser);
// if we are getting put make it protected and pass in the
// updateUserProfile controller
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
