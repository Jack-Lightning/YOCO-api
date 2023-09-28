const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let userLogin = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
    },
    isGoogle:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

userLogin.pre('save',async function(next){
    try{
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(this.password,salt);
        this.password = hash;
        next();
    }
    catch(err){
        console.log(err);
    }
});

userLogin.methods.isValidPassword = async function(password){
    try{
        return await bcrypt.compare(password,this.password);
    }
    catch(err){
        console.log(err);
    }
}

module.exports = mongoose.model('userLogin',userLogin);