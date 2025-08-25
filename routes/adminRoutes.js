import express from "express";
import { loginAdmin, getAdminProfile } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);        // Admin login
router.get("/profile", getAdminProfile);  // Token verification

export default router;
