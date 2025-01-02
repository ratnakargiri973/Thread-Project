import express from 'express';
import { 
    changePassword,
    deleteProfilePicture,
    deleteUser,
    editProfile,
    forgotPassword,
        getAllUsers,
        getProfilePicture,
        getSingleUser,
        login, 
        logout, 
        profile, 
        Register, 
        uploadProfilePicture, 
        verifyOtp
    } from '../controller/userController.js';
import { protectRoute } from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.post("/register", Register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/verify-otp', verifyOtp);
userRouter.post('/change-password', changePassword);

userRouter.get('/profile', protectRoute, profile);
userRouter.put('/edit-profile', protectRoute, editProfile);
userRouter.delete('/delete/:id', deleteUser);

userRouter.post('/profile-picture', protectRoute, upload.single("image"), uploadProfilePicture);
userRouter.get('/profile-picture', protectRoute, getProfilePicture);
userRouter.delete('/profile-picture', protectRoute, deleteProfilePicture);


userRouter.get('/', protectRoute, getAllUsers);
userRouter.get('/:id',protectRoute, getSingleUser);
export default userRouter;