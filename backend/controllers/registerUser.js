const User =require("../models/userModel.js");
const asyncHanlder=require("express-async-handler");
const bcrypt=require("bcrypt");
const generateToken = require("../utils/generateToken.js");
const registerUser=asyncHanlder(async(req,res)=>{
    const {name,email,password,pic}=req.body;
    const userExists=await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("user already exists");
    }
    const salt =await bcrypt.genSalt(5);
    const passwordHash=await bcrypt.hash(password,salt);
    const user= new User({
        name,
        email,
        password:passwordHash,
        pic
    });
    await user.save();
    if(user){
        res.status(201).json({name:user.name,email:user.email,pic:user.pic,
        token:generateToken(user._id)});
    }
    else{
        res.status(400);
        throw new Error("error occured");
    }
    // res.json({name,email});
})
const authUser=asyncHanlder(async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        res.status(400);
        throw new Error("user not found ");
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(isMatch){
        res.status(201).json({name:user.name,email:user.email,pic:user.pic,token:generateToken(user._id)});
        console.log(token)
    }
    
    else{
        res.status(400);
        throw new Error("error occured");
    }
   
})
const updateUserProfile=asyncHanlder(async(req,res)=>{
    const user=await User.findById(req.user._id);
    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;
        user.pic =req.body.pic  || user.pic;
        if(req.body.password){
            user.password=req.body.password || user.password
        };
        const updatedUser=await user.save();
        console.log(updatedUser)
        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            pic:updatedUser.pic,
            token:generateToken(updatedUser._id)
        })
    }
    else{
        res.status(404);
        throw new Error ("user not found");
    }
})
module.exports={registerUser,authUser,updateUserProfile}