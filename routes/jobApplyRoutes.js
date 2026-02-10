// import express from "express";
// import { createJobApplication, upload , getAllApplications,getMonthlyStudentStats} from "../controllers/jobApplyController.js";

// const router = express.Router();

// // POST: /api/jobapply
// router.post("/", upload.single("file"), createJobApplication);

// // GET: /api/jobapply
// router.get("/", getAllApplications);

// //today//30 december
// // 🔹 MONTH WISE APPLICATION GRAPH
// router.get("/stats/monthly", getMonthlyStudentStats);

// export default router;






//10 feb 
import express from "express";
import { 
  createJobApplication, 
  upload, 
  getAllApplications,
  getMonthlyStudentStats,
  getApplicationsByCompany,  // ✅ New
  getCompanyWiseStats        // ✅ New
} from "../controllers/jobApplyController.js";

const router = express.Router();

// POST: /api/jobapply
router.post("/", upload.single("file"), createJobApplication);

// GET: /api/jobapply
router.get("/", getAllApplications);

// 🔹 MONTH WISE APPLICATION GRAPH
router.get("/stats/monthly", getMonthlyStudentStats);

// ✅ NEW: Get applications by specific company
// GET: /api/jobapply/company/:companyId
router.get("/company/:companyId", getApplicationsByCompany);

// ✅ NEW: Get company-wise statistics
// GET: /api/jobapply/stats/companies
router.get("/stats/companies", getCompanyWiseStats);

export default router;