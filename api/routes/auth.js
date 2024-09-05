import express from "express";
import { register, login, logout } from "../controllers/authController.js";
const router = express.Router();
// Register
router.post("/register", register);
// login
router.post("/login", login);
//logout routes
router.post("/logout", logout);

export default router;
