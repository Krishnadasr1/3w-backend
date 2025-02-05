import express from 'express';
import { getAllUserBankInfo, searchBankInfo } from '../controllers/adminController.js';
import protect from '../middleware/authMiddleware.js';
import admin from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/all-banks', protect, admin, getAllUserBankInfo);
router.get('/search', protect, admin, searchBankInfo);

export default router;