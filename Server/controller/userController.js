import mongoose from 'mongoose';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { generateOtp } from '../utils/generateOtp.js';
import  { sendMail } from '../utils/sendMail.js'
// import { sendVerificationEmail } from '../utils/verification.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

export const Register = async (req, res) => {
    const {name, username, email, phone, gender} = req.body;

    try {
        const existingUsername = await User.findOne({username});

        if(existingUsername){
            return res.status(400).send({message: `Username ${username} exists.`})
        }

        const existingEmail = await User.findOne({email});

        if(existingEmail){
            return res.status(400).send({message: "Given email address exists. Please try with another email."});
        }

        const nameRegex = /^[A-Za-z]+ [A-Za-z]+$/;
        if(!nameRegex.test(name)){
            return res.status(400).send({message: "Give a valid name"});
        }

        if(!/^[A-Z][a-z]*$/.test(username)){
            return res.status(400).send({message: "Give a valid username"});
        }

        if(!email.includes("@")){
            return res.status(400).send({message: "Email must contain a @ symbol."});
        }

        const password = await bcrypt.hash(req.body.password, 10);

        if (!/^\d{10,}$/.test(phone)) {
            return next(new Error("Phone number must be at least 10 digits long."));
          }
        

        const newUser = await User({
            name,
            username,
            email,
            password,
            phone,
            gender
        });

        await newUser.save();
        // await sendVerificationEmail(newUser._id, newUser.email);

        res.status(201).send({message: "User registered successfully", newUser});

    } catch (error) {
        res.status(500).send({messsage: "Error registering user"});
    }
}

export const login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});

        if(!user){
            return res.status(401).send({message: "Incorrect Credentials"});
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if(!passwordMatched){
            return res.status(401).send({message: "Incorrect Credentials"});
        }
   
        const token = jwt.sign(
            {
              userId: user._id,
              username: user.username
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "24h"
            }
       );

       res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000,
       })

       const loggedInUser = {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone
       };

       res.status(200).send({message: "User logged in successfully", loggedInUser});

    } catch (error) {
        res.status(500).send({message: "Error logging in user"});
    }
}


export const logout = async (req, res) => {
    try {
        res.clearCookie("token",
            {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            });
          res.status(200).send({message: "User logged out successfully"});

    } catch (error) {
        res.status(500).send({message: "Error logging out user"});
    }
}


export const forgotPassword = async (req, res) => {
    const { username } = req.body;

    if(!username) {
        return res.status(400).send({message: "username is required"});
    }

    const user = await User.findOne({username});

    if(!user){
        return res.status(404).send({message: "User does not exist."});
    }
    try {
        const subject = 'Reset Password';
        const body = generateOtp();
        const otp = body;
        await sendMail(process.env.USER_EMAIL, process.env.USER_PASSWORD, user.email, subject, body);
        await updateOtp(user._id, otp);
        res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        res.status(500).send({message: "Failed to send password reset email"});
    }
}

export async function verifyOtp(req, res){
    const {username, otp} = req.body;
    const user = await User.findOne({username: username});
    if(!user){
        return res.status(401).json({message: "User not found"});
    }
    if(user.otp === otp && Date.now() < user.validFor){
        user.otpIsValid= true;
        user.save();
        res.status(200).json({message: 'OTP is verified successfully'});
    }
    else{
        res.status(401).json({message: 'Invalid Otp'});
    }
  }
  
  
  export async function changePassword(req, res){
    const {username, password} = req.body;
    
    const user = await User.findOne({username: username});
    if(!user){
        res.status(401).json({message: "User not found"});
    }
  
    if(!user.otpIsValid){
      return res.status(400).json({message: "OTP verifucation is required"});
    }
  
    const hashPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(
        user._id,
        {password: hashPassword},
        {new: true, upsert: false}
   );
   res.status(200).json({message: 'Password updated successfully'});
  }
  
  async function updateOtp(userId, otp){
    try {
        const validFor = Date.now() + 5 * 60 * 1000;
        const updatedUser = await User.findByIdAndUpdate(
             userId,
             {otp, validFor, otpIsValid: false},
             {new: true, upsert: false}
        );
  
        if(!updatedUser){
            res.status(401).json({message: "User not found"});
            return null;
            
        }
        return updatedUser;
    } catch (error) {
        console.error('Error updating OTP: ', error);
        throw error;
    }
  }
  
  export const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if(!user){
            return res.status(404).send({message: "user not found"});
        }

        const profile = {
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            bio: user.bio,
            profilePicture: user.profilePicture
        };

        res.status(200).send(profile);
    } catch (error) {
        res.status(500).send({message: "Error fetching user data"});
    }
  }

  export const editProfile = async (req, res) => {
    const { name, username, email, phone, gender, bio } = req.body;
    try {
         await User.findByIdAndUpdate(req.user._id, {
            name,
            username,
            email,
            phone,
            gender,
            bio
        });


       res.status(200).send({message: "Profile updated successfully"})
    } catch (error) {
        res.status(500).send({message: "Error updating profile"});
    }
  }

  export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
       if(!id){
           return res.status(400).send({message: "You must specify a User ID"})
       }
   
       if(!mongoose.Types.ObjectId.isValid(id)){
           return res.status(404).send({message: "The user ID is not in proper format"});
       }
   
       const deletedUser = await User.findByIdAndDelete(id);
   
       if (!deletedUser)
           return response
             .status(404)
             .send({ message: "No user found with the given ID" });
     
         res.send({ message: "User with the given ID deleted" });
    } catch (error) {
         res.status(500).send({message: "Error deleting user", error});
    }
}

export const uploadProfilePicture = async (req, res) => {
    try {
        const imageObj = await uploadToCloudinary(req.file.buffer);

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        user.profilePicture = imageObj.secure_url;

        await user.save();

        res.status(200).json({
            message: 'Profile picture uploaded successfully!',
            profilePicture: user.profilePicture,
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while uploading the profile picture.', error });
    }
}

export const getProfilePicture = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(404).send({message: "user not found"});
        }

        if (!user.profilePicture) {
            return res.status(404).send({ message: "Profile picture not found" });
        }

        return res.status(200).send({
            message: "Profile picture retrieved successfully",
            profilePicture: user.profilePicture,
        });
    } catch (error) {
        return res.status(500).send({
            message: "An error occurred while retrieving the profile picture",
            error: error.message,
        });
    }
}

export const deleteProfilePicture = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        if(!user){
            return res.status(404).send({message: "User not found"});
        }

        if(!user.profilePicture){
            return res.status(404).send({message: "Profile picture is not found for this user"});
        }

        user.profilePicture = null;
        await user.save();

        return res.status(200).send({ message: "Profile picture deleted successfully" });
    } catch (error) {
        res.status(500).send({message: "Error in deleting profile picture"});
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();

       const users = allUsers.filter((user) => user._id.toString() !== req.user._id.toString() );

        res.status(200).send({message: "Success", users});
    } catch (error) {
        res.status(500).send({message: "Error in fetching users"});
    }
}

export const getSingleUser = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findById(id);
        if(!user){
            return res.status(404).send({message: "User not found"});
        }

        res.status(200).send({message: "Success", user});
    } catch (error) {
        res.status(500).send({message: "Error fetching particular user"});
    }
}
