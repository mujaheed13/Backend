const express = require("express");
const postRouter = express.Router();
const { PostModel } = require("../models/post.model.js");


postRouter.get("/", async(req, res)=>{
    try {
        const posts = await PostModel.find({userId:req.body.userId});
        res.json(posts);
    } catch (error) {
        console.log(error);
        res.json({msg:"Something went wrong"});
    }
})

postRouter.post("/create", async(req, res)=>{
    try {
        const post = PostModel(req.body);
        await post.save();
        res.json({msg: "Post has been created"});
    } catch (error) {
        console.log(error);
        res.json({msg:"Something went wrong"});
    }
})

postRouter.patch("/update/:id", async(req, res)=>{
    const req_uid = req.body.userId;
    const post = await PostModel.findOne({_id:req.params.id});
    try {
        if(req_uid==post.userId){
            await PostModel.findByIdAndUpdate({_id:req.params.id}, req.body);
            res.json({msg: "Post has been updated"});
        } else {
            res.status(401).json({msg: "You are not authorized"});
        }
    } catch (error) {
        console.log(error);
        res.json({msg:"Something went wrong"});
    }
})

postRouter.delete("/delete/:id", async(req, res)=>{
    const req_uid = req.body.userId;
    const post = await PostModel.findOne({_id:req.params.id});
    try {
        if(req_uid==post.userId){
            await PostModel.findByIdAndDelete({_id:req.params.id});
            res.json({msg: "Post has been deleted"});
        } else {
            res.status(401).json({msg: "You are not authorized"});
        }
    } catch (error) {
        console.log(error);
        res.json({msg:"Something went wrong"});
    }
})

module.exports = { postRouter }