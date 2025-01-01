import express from 'express';
import 'dotenv/config'
import { connectDB } from './db/connectDB.js';
import userRouter from './router/userRouter.js';
import cookieParser from 'cookie-parser';


const PORT = process.env.PORT;

const app = express();

app.use(cookieParser());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/v1/user', userRouter);

await connectDB();

app.listen(PORT, ()=>{
    console.log(`Server started at PORT ${PORT}`);
});
