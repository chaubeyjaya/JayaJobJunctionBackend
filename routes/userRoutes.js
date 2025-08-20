import express from 'express';
import { getUsers, createUser ,verifyCode,sendCode} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/createUser', createUser);
router.post('/send-code', sendCode);
router.post('/verify-code', verifyCode); // <--- NEW


export default router;
