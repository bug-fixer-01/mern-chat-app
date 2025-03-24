import User from "../models/user.models.js";
import bcrypt from "bcryptjs"
import generateTokenandCookies from "../utils/generateToken.js";

export const signup = async (req,res)=>{
    try{
        const { fullname, username , password} = req.body;

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error:"Username is already taken"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullname,
            username,
            password:hashPassword,
        })

         generateTokenandCookies(newUser._id,res)

        await newUser.save();

        res.status(201).json({
            _id:newUser._id,
            fullname:newUser.fullname,
            username:newUser.username,
        })

    }
    catch(error){
        console.log("error in signup controller", error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const login =async (req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username})
        if( user == null){
            return res.status(404).json({error:"Invalid username"})
        }

        const ispasswordcorrect = await bcrypt.compare(password,user.password )
        // console.log(ispasswordcorrect)

        if(!ispasswordcorrect){
           return res.status(404).json({error:"Invalid password"})
        }
     
        generateTokenandCookies(user._id,res);
     
        res.status(201).json({
           _id:user._id,
           Fullname:user.fullname,
           username:user.username
        })

    }
    catch(error){
        console.log("error in login controller", error.message);
        res.status(500).json({error:"Internal Server Error"})    
    }
    
}

export const logout = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge: 0 });
        res.status(200).json({messgae:"Logged out successfully"})
    }
    catch(error){
        console.log("error in logout controller", error.message);
        res.status(500).json({error:"Internal Server Error"}) 
    }
}