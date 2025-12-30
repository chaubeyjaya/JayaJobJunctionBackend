import express from "express";
import { createJobApplication, upload , getAllApplications,getMonthlyStudentStats} from "../controllers/jobApplyController.js";

const router = express.Router();

// POST: /api/jobapply
router.post("/", upload.single("file"), createJobApplication);

// GET: /api/jobapply
router.get("/", getAllApplications);

//today//30 december
// 🔹 MONTH WISE APPLICATION GRAPH
router.get("/stats/monthly", getMonthlyStudentStats);

export default router;
