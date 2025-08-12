import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";
import { getMyProfile, updateMyProfile, deleteMyProfile, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", protect, getMyProfile);
router.put("/me", protect, updateMyProfile);
router.delete("/me", protect, deleteMyProfile);

// Admin only
router.get("/all", protect, isAdmin, getAllUsers);

export default router;
