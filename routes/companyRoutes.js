import express from 'express';
import { createCompany, getCompanies ,deleteCompany,getCompanyStats,getTotalCompanies } from '../controllers/companyController.js';

const router = express.Router();

router.post('/add', createCompany);
router.get('/all', getCompanies);


// 🗑️ DELETE ROUTE (VERY IMPORTANT)
router.delete('/delete/:id', deleteCompany);


//today 30 december
// 🔹 COMPANY GRAPH DATA
router.get("/stats", getCompanyStats);
router.get("/count", getTotalCompanies);

export default router;
