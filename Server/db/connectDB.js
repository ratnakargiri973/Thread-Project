import express from 'express';
import mongoose from 'mongoose';

export const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {dbName: process.env.DB});
    } catch (error) {
        console.log("Error in connecting databas", error);
    }
}