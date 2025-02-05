import BankAccount from '../models/BankAccount.js';
import User from '../models/User.js';

export const getAllUserBankInfo = async (req, res) => {
    try {
        const bankAccounts = await BankAccount.find().populate('user', 'username email');
        res.json(bankAccounts);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const searchBankInfo = async (req, res) => {
    const { query } = req.query;

    try {
        const users = await User.find({ username: new RegExp(query, 'i') });
        const userIds = users.map(user => user._id); 

        const results = await BankAccount.find({
            $or: [
                { accountHolderName: new RegExp(query, 'i') },
                { bankName: new RegExp(query, 'i') },
                { ifscCode: new RegExp(query, 'i') },
                { user: { $in: userIds } }  
            ]
        }).populate('user', 'username email');

        res.json(results);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
