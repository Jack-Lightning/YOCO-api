const mongoose = require('mongoose');
const userModel = require('../models/userModel.js');
const gUserModel = require('../models/googleuserModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const oauth = require('oauth');
const axios = require('axios');


exports.googleLoginUser = async(req,res)=>{
   
    const email = req.body.email;
    const uid = req.body.uid;
    const name = req.body.name; 
    let userExists = await gUserModel.findOne({email:email});

    if(userExists){
        //validate hashed password
            const token = jwt.sign({
                email:email,
                id:userExists._id
            },process.env.TOKEN_SECRET,{expiresIn:'5h'});
            
            res.status(200).json({message:'Logged in successfully',token:token});
    }else{
        let newUser = new gUserModel({
            email: email,
            uid: uid,
            name: name
        });
        await newUser.save();
        const token = jwt.sign({
            email:email,
            id:userExists._id
        },process.env.TOKEN_SECRET,{expiresIn:'5h'});
        
        res.status(400).json({message:'User regsitered successfully',token:token});
    }
}


exports.loginUser = async(req,res)=>{
   
        const email = req.body.email;
        let password = req.body.password;

        let userExists = await userModel.findOne({email:email});

        if(userExists){
            //validate hashed password
            let validPassword = await bcrypt.compare(password,userExists.password);
            if(validPassword){
                //Create and assign token
                const token = jwt.sign({
                    email:email,
                    id:userExists._id
                },process.env.TOKEN_SECRET,{expiresIn:'5h'});
                
                res.status(200).json({message:'Logged in successfully',token:token});
            }else{
                res.status(400).json({message:'Invalid password'});
            }
        }else{
            res.status(400).json({message:'Invalid email'});
        }
}


exports.registerUser = async(req,res)=>{

    const email = req.body.email;
    const password = req.body.password;
    let newUser = new userModel({
        email: email,
        password: password
    });

    try{
        //check if user exists
        let userExists = await userModel.findOne(newUser);
        if (userExists){
            res.status(200).json({message:'User already exists'});
        }else{
            await newUser.save();
            //create and assign token
            const token = jwt.sign({
                email:email,
                id:newUser._id
            },process.env.TOKEN_SECRET,{expiresIn:'5h'});
            
            res.status(200).json({message:'Registered successfully',token:token});
        }
    }catch(err){
        res.status(500).json({message:"Error occured while registering user"});
    }
}