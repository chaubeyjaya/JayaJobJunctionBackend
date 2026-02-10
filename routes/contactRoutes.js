import express from 'express';
import { submitContactForm, getContactMessages } from '../controllers/contactController.js';

const router = express.Router();

router.post('/submit', submitContactForm);
router.get('/all', getContactMessages); // New route

export default router;