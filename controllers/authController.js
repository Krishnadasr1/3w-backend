import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({message:"success",user});
    } catch (err) {
        
        res.status(500).json({ message: 'Server error',err});
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const payload = { user: { id: user.id, isAdmin: user.isAdmin } };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.json({ message:"login successful",token });
    } catch (err) {
        console.log(err);
        
        res.status(500).json({ message: 'Server error' });
    }
};