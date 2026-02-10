import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/",authMiddleware, async(req, res) => {

})



// signup

router.post("/signup", async(req, res)=> {
    try{
        const{email, password} = req.body;

        // check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(400).json({ message: "user already exists"});
        }

        //hash password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({message: "User registered successfully"});
    }catch (error){
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
});

router.post("/login", async(req,res)=> {
    try{
        const {email, password} = req.body;

        // find user
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({message: "Invalid cridentials"});
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        // creaet JWT token
        const token = jwt.sign(
            {userId: user._id},
            "secretkey",  // we will move this to .env later
            {expiresIn: "7d"}
        );
        
        res.json({token});
    }catch (error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});


export default router;