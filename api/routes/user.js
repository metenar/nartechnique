import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//Update User
router.put("/:id", verifyAdmin, updateUserById);
//Delete User
router.delete("/:id", verifyAdmin, deleteUser);
//Get User By Id
router.get("/:id", verifyAdmin, getUserById);
//Get All Users
router.get("/", verifyAdmin, getAllUsers);

export default router;
