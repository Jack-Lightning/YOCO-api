const mongoose = require('mongoose');
const userModel = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const oauth = require('oauth');
const axios = require('axios');


exports.loginUser = async(req,res)=>{
    if(req.body.googleAccessToken){
        //google oauth
        axios.get("https://www.googleapis.com/oauth2/v1/userinfo",{
            headers:{
                "Authorization": `Bearer ${req.body.googleAccessToken}`
            }
        }).then(async(response)=>{
            const email = response.data.email;
            let newUser = new userModel({
                email: email,
                isGoogle: true
            });
            const userExists = await userModel.finOne(userModel);
            if(userExists){
                //create and assign token
                const token = jwt.sign({
                    email:email,
                    id:newUser._id
                },process.env.TOKEN_SECRET,{expiresIn:'5h'});

                res.status(200).json({message:'Google Login successfully',token:token});
            }
            else{
                res.status(200).json({message:'User does not exist',token:token});
            }
        }).catch((err)=>{
            console.log(err);        
        })   
    }

    else{
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
}


exports.registerUser = async(req,res)=>{
    if(req.body.googleAccessToken){
        //google oauth
        axios.get("https://www.googleapis.com/oauth2/v1/userinfo",{
            headers:{
                "Authorization": `Bearer ${req.body.googleAccessToken}`
            }
        }).then(async(response)=>{
            const email = response.data.email;
            let newUser = new userModel({
                email: email,
                isGoogle: true
            });
            const userExists = await userModel.finOne(userModel);
            if(userExists)
                return res.status(200).json({message:'User already exists'});
            else{
                await newUser.save();
                //create and assign token
                const token = jwt.sign({
                    email:email,
                    id:newUser._id
                },process.env.TOKEN_SECRET,{expiresIn:'5h'});

                res.status(200).json({message:'Google Registration successful',token:token});
            }
        }).catch((err)=>{
            console.log(err);        
        })   
    }
    else{

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
}