import BankAccount from '../models/BankAccount.js';

export const addBankAccount = async (req, res) => {
    const { ifscCode, branchName, bankName, accountNumber, accountHolderName } = req.body;
    try {
        const bankAccount = new BankAccount({
            user: req.user.id,
            ifscCode,
            branchName,
            bankName,
            accountNumber,
            accountHolderName
        });
        await bankAccount.save();
        res.status(201).json(bankAccount);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getBankAccounts = async (req, res) => {
    try {
        const bankAccounts = await BankAccount.find({ user: req.user.id });
        res.json(bankAccounts);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateBankAccount = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const bankAccount = await BankAccount.findOneAndUpdate(
            { _id: id, user: req.user.id },
            updates,
            { new: true }
        );
        if (!bankAccount) return res.status(404).json({ message: 'Bank account not found' });
        res.json(bankAccount);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteBankAccount = async (req, res) => {
    const { id } = req.params;
    try {
        const bankAccount = await BankAccount.findOneAndDelete({ _id: id, user: req.user.id });
        if (!bankAccount) return res.status(404).json({ message: 'Bank account not found' });
        res.json({ message: 'Bank account deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};