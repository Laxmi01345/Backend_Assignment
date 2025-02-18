import express from 'express'
import mongoose from 'mongoose'
import User from './Routes/User.js';


const app = express();
const PORT = 3000;

app.use(express.json());

const connectDB = async()=>{
    await mongoose.connect(`mongodb+srv://laxmiray013:00fzmULiSUtJXzgP@cluster0.ugl4e.mongodb.net/`);
    console.log("database connected ")
}
connectDB();

app.use('/api', User);

app.listen(PORT,()=>{
    console.log(`Server is connected with port ${PORT}`);
})

