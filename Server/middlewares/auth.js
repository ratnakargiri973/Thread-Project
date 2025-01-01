import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../models/userModel.js';


export const protectRouter = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if(!token){
            return res
                   .status(401)
                   .json({message: "No token, authorization denied"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);

        if(decoded.exp < Date.now() / 1000){
            return res.status(401).json({message: "Token expired"});
        }
       
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).send({message: "User no longer exists"});
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).send({message: "Not authorised"});
    }
}