import express from "express";
import {
  getAllReviews,
  getReviewById,
  updateReviewById,
  deleteReview,
  createReview,
  countReviews,
} from "../controllers/reviewController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();
// Create
router.post("/", verifyAdmin, createReview);
// Delete
router.delete("/:id", verifyAdmin, deleteReview);
// Update
router.put("/:id", verifyAdmin, updateReviewById);
// Get One
router.get("/find/:id", getReviewById);
// Get All
router.get("/", getAllReviews);
// Total Review Count
router.get("/total", countReviews);
export default router;
