const mongoose  = require('mongoose');

const userSchema = mongoose.Schema({
    username:{type:String,required:true}, 
    email:{type:String,required:true} ,
    phone:{type:String} ,
    password:{type:String,required:true} ,  
    // cpassword:{type:String,required:true} , 
    role:{type:String,default:'user'},   
    type:{type:String,default:'registred'}   
})

module.exports = mongoose.model('user',userSchema);