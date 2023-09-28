const docModel = require('../models/docModel.js');

exports.uploadFile = async(req,res)=>{
    //Storing the file in the database
    const doc = new docModel({
        email:req.body.email,
        filename:req.body.name,
        file:req.files.file.data
    });

    try{
        //Saving the file in the database
        const savedDoc = await doc.save();
        return res.status(200).json({message:"success", data:{data:savedDoc.data, createdAt:savedDoc.createdAt}});
    }catch(err){
        return res.json({message:"failed",data:[]});
    }
}

exports.getAllFiles = async(req,res)=>{
    try{
        //Getting all the files uploaded by a specific user
        const docs = await docModel.find({email:req.params.email}, {_id:0,file:1,filename:1,createdAt:1})
        .sort({createdAt:-1});
        if(!docs){
            return res.json({message:"No uploaded files",data:[]});
        }
        return res.status(200).json({message:"success", data:docs});
    }catch(err){
        return res.json({message:"failed",data:[]});
    }
}