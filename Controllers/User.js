import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {Auth, User} from '../Models/User.js'
import dotenv from 'dotenv'

dotenv.config();

const SignUp =async(req,res)=>{
    
    try{
        const {name , email , password }= req.body;

        if (!name && !email && !password){
            return res.status(400).json({message : 'fill the empty fields'});
        }

        if (!name){
            return res.status(400).json({message : 'Enter your name'});
        }
        if (!email){
            return res.status(400).json({message : 'Enter your email'});
        }
        if (!password){
            return res.status(400).json({message : 'Enter your password'});
        }


        const existingUser = await Auth.findOne({email});

        if (existingUser){
            return res.status(400).json({message : "email already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = Auth({name , email , password: hashedPassword});
        await newUser.save();

        const token = jwt.sign({email:newUser.email}, process.env.JWT_SECRET,{
            expiresIn:'1d'
        })
        res.json({status:"success",token})
    }
    catch(err){
        res.status(400).json({message:"error while loading"});
    }

}


const Login = async(req,res)=>{
    
    try{
        const {email , password} =req.body;

        if (!email && !password){
            return res.status(400).json({message : 'fill the empty fields'});
        }

        if (!email){
            return res.status(400).json({message : 'Enter your email'});
        }
        if (!password){
            return res.status(400).json({message : 'Enter your password'});
        }

        const user = await Auth.findOne({email});

        if (!user){
            return res.status(400).json({message : "Email is not registered !"})
        }

        const isMatch = await bcrypt.compare(password , user.password)

        if (isMatch){
            const token = jwt.sign({email : user.email}, process.env.JWT_SECRET,{
                expiresIn:'1d'
            });

            res.json({status : "success" , token});
        }
        else{
            res.status(400).json({message : "Password is incorrect !"});
        }
    }
    catch(err){
        res.status(400).json({message : err.message});
    }

}

const Users=async(req,res)=>{

    try{

        const {name, email , role} = req.body;

        if (!name && !email && !role){
            return res.status(400).json({message : 'fill the empty fields'});
        }

        if (!name){
            return res.status(400).json({message : 'Enter your name'});
        }
        if (!email){
            return res.status(400).json({message : 'Enter your email'});
        }
        if (!role){
            return res.status(400).json({message : 'Enter your role'});
        }

        const existingUser = await User.findOne({email});

        if (existingUser){
            return res.status(400).json({message : 'user already exists'})
        }

        const newUser = User({name,email,role});

        await newUser.save();

        res.json({status: "success"});

    }
    catch(err){
        res.status(400).json({message : err.message});
    }
}

const AllUsers=async(req,res)=>{

    try{
        const users = await User.find({role:'user'});

        
        res.json(users);

    }
    catch(err){
        res.status(500).json({message : err.message});
    }
}

const UpdateUsers =async(req,res)=>{
    
    try{
        const userId = req.params.id;
        const {name,email,role}= req.body;

        // If password is being updated, hash it
        let updateData = { name, email ,role};

        // Update user with new data
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true } // This option returns the updated document
        );

        res.json({ 
            status: "success", 
            message: "User updated successfully",
            user: updatedUser 
        });


    }
    catch(err){
        res.status(500).json({ message: err.message });

    }

}

const DeleteUser =async(req,res)=>{
    const userId = req.params.id;

    try{

        const user = await User.findById(userId);

        if (!user){
            return res.status(400).json({message :'user is not registered'})
        }

       
        
        if (user.role === 'admin'){
            await User.findByIdAndDelete(userId);
            res.json({status : 'success', message : 'user deleted successfully'});
            
        }
        else{
            res.status(400).json({message : 'Only admin can delete the entry'})
        }

        

    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}


export { SignUp, Login ,Users,AllUsers,UpdateUsers,DeleteUser};