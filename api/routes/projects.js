import express from "express";
import {
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProject,
  createProject,
} from "../controllers/projectController.js";
const router = express.Router();
// Create
router.post("/", createProject);
// Delete
router.delete("/:id", deleteProject);
// Update
router.put("/:id", updateProjectById);
// GetOne
router.get("/find/:id", getProjectById);
// GetAllProject
router.get("/", getAllProjects);
export default router;
