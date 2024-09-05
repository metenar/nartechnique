import express from "express";
import {
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProject,
  createProject,
} from "../controllers/projectController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();
// Create
router.post("/", verifyAdmin, createProject);
// Delete
router.delete("/:id", verifyAdmin, deleteProject);
// Update
router.put("/:id", verifyAdmin, updateProjectById);
// GetOne
router.get("/find/:id", getProjectById);
// GetAllProject
router.get("/", getAllProjects);
export default router;
