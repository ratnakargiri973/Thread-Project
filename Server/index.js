import express from 'express';
import 'dotenv/config'
import { connectDB } from './db/connectDB.js';
import userRouter from './router/userRouter.js';
import cookieParser from 'cookie-parser';
import authRoute from './router/authRoute.js';
import cors from 'cors';
import followRouter from './router/followRouter.js';
import messageRouter from './router/messageRouter.js';
import postRouter from './router/postRouter.js';


const PORT = process.env.PORT || 3000;

const app = express();

const corsOption = {
    origin: "https://thread-project-1.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}

app.use(cors(corsOption));

app.use(cookieParser());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/follower', followRouter);
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/post', postRouter);

await connectDB();

app.listen(PORT, ()=>{
    console.log(`Server started at PORT ${PORT}`);
});
