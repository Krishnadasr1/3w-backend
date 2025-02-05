import express from 'express';
import { addBankAccount, getBankAccounts, updateBankAccount, deleteBankAccount } from '../controllers/bankController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/addBank', protect, addBankAccount);
router.get('/getBank', protect, getBankAccounts);
router.put('/updateBank/:id', protect, updateBankAccount);
router.delete('/deleteBank/:id', protect, deleteBankAccount);

export default router;