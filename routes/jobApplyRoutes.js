import express from "express";
import { createJobApplication, upload , getAllApplications} from "../controllers/jobApplyController.js";

const router = express.Router();

// POST: /api/jobapply
router.post("/", upload.single("file"), createJobApplication);

// GET: /api/jobapply
router.get("/", getAllApplications);

export default router;
