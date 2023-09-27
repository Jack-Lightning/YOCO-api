const mongoose = require('mongoose');

let fileSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    file:{
        type:String,
        required:true,
    }
},{timestamps:true});

module.exports = mongoose.model('files',fileSchema);