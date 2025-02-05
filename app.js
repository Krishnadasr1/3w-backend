import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import bankRoutes from './routes/bankRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())

app.use('/api/auth', authRoutes);
app.use('/api/banks', bankRoutes);
app.use('/api/admin', adminRoutes);

mongoose.connect(process.env.DB_URL);

mongoose.connection.on("error",(err)=>{
    console.log("err", err);
});

mongoose.connection.on("connected",(err,res)=>{
    console.log("connected to MongoDB");
    
});

app.listen(process.env.PORT || 3000, () =>
    { console.log(`Server running on port ${process.env.PORT}`)});