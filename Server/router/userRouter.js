import express from 'express';
import { 
    changePassword,
    deleteUser,
    editProfile,
    forgotPassword,
        login, 
        logout, 
        profile, 
        Register, 
        verifyOtp
    } from '../controller/userController.js';
import { protectRouter } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post("/register", Register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/verify-otp', verifyOtp);
userRouter.post('/change-password', changePassword);

userRouter.get('/profile', protectRouter, profile);
userRouter.put('/edit-profile', protectRouter, editProfile);
userRouter.delete('/delete/:id', deleteUser);

export default userRouter;