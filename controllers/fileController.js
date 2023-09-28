const docModel = require('../models/docModel.js');

exports.uploadFile = async(req,res)=>{
    const doc = new docModel({
        email:req.body.email,
        file:req.files.file.data
    });
    try{
        const savedDoc = await doc.save();
        res.status(200).json({message:"success",data:savedDoc});
    }catch(err){
        res.json({message:err,data:[]});
    }
}