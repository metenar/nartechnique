import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import reviewsRoute from "./routes/reviews.js";
import projectsRoute from "./routes/projects.js";
import usersRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import cors from "cors";
import path from "path";
import url, { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8800;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use("/reviews", reviewsRoute);
app.use("/projects", projectsRoute);
app.use("/users", usersRoute);
app.use("/auth", authRoute);

app.use(express.static(path.join(__dirname, "../")));

app.get("*", req, (res) => {
  res.send(path.join(__dirname, "../", "index.html"));
});
app.listen(PORT, () => {
  connect();
  console.log(`connected to backend server! using ${PORT} port`);
});
