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
    bio: {
        type: String,
        default: null
    },
    profilePicture: {
        type: String,
        default: null
    },
    otp: {
        type: String,
        default: null
    },
    otpIsValid: {
        type: Boolean,
        default: false
    },
    validFor: {
        type: Date,
        default: null
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user"
    }],
    followings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
},{timestamps: true});

const User = mongoose.model("user", userSchema);
export default User;