const express = require("express");
const userRouter = express.Router();
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model.js");

dotenv.config();

userRouter.post("/register", async(req, res)=>{
    const {name, email, password, gender} = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hashed_pass)=>{
            if(err){
                console.log(err);
                res.json({msg:"Something went wrong"});
            } else {
                const user = UserModel({name, email, gender, password:hashed_pass});
                await user.save();
                res.json({msg: "User has been registered"});
            }
        })
    } catch (error) {
        console.log(error);
        res.json({msg:"Something went wrong"});
    }
})

userRouter.post("/login", async(req, res)=>{
    const user = await UserModel.findOne({email:req.body.email});
    try {
        if(user){
            bcrypt.compare(req.body.password, user.password, (err, result)=>{
                if(result){
                    const token = jwt.sign({_id:user._id}, process.env.key);
                    res.json({msg:"Login Successful", token});
                } else {
                    res.status(401).json({msg:"Wrong Credentials"});
                } 
            })
        }else{
            res.status(404).json({msg:"User Not Found"});
        }
        console.log(user);
    } catch (error) {
        console.log(error);
        res.json({msg:"Something went wrong"});
    }
})

module.exports = { userRouter };