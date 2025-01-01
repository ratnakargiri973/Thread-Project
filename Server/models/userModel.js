import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    gender:{
        type: String
    },
    otp: {
        type: Number,
        default: null
    },
    otpIsValid: {
        type: Boolean,
        default: false
    },
    validFor: {
        type: Date,
        default: null
    }
},{timestamps: true});

const User = mongoose.model("user", userSchema);
export default User;