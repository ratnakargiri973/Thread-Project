import express from 'express'
// import { verifyToken } from '../controller/authController.js';
import { protectRoute } from '../middlewares/auth.js';


const authRouter = express.Router();

// authRouter.post('/verify-token', verifyToken);

authRouter.get("/validate-token", protectRoute, (req, res) => {
    res.status(200).send({user: req.user});
});


export default authRouter;