import express from 'express';
import { createCompany, getCompanies } from '../controllers/companyController.js';

const router = express.Router();

router.post('/add', createCompany);
router.get('/all', getCompanies);

export default router;
