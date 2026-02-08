import express from "express";
import {
  addResource,
  getResources
} from "../controllers/resourceController.js";

const router = express.Router();

// Admin
router.post("/add", addResource);

// User
router.get("/", getResources);

export default router;
