import express from "express";
import {
  getAllReviews,
  getReviewById,
  updateReviewById,
  deleteReview,
  createReview,
  countReviews,
} from "../controllers/reviewController.js";
const router = express.Router();
// Create
router.post("/", createReview);
// Delete
router.delete("/:id", deleteReview);
// Update
router.put("/:id", updateReviewById);
// Get One
router.get("/find/:id", getReviewById);
// Get All
router.get("/", getAllReviews);
// Total Review Count
router.get("/total", countReviews);
export default router;
