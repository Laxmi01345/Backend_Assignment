import express from 'express'
import mongoose from 'mongoose'
import User from './Routes/User.js';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

const connectDB = async()=>{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected ")
}
connectDB();

app.use('/api', User);

app.listen(PORT,()=>{
    console.log(`Server is connected with port ${PORT}`);
})

