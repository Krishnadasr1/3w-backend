import mongoose from 'mongoose';

const bankAccountSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ifscCode: { type: String, required: true },
    branchName: { type: String, required: true },
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    accountHolderName: { type: String, required: true }
});

export default mongoose.model('BankAccount', bankAccountSchema);
