const mongoose  = require('mongoose');
Schema = mongoose.Schema;

const calendarSchema = mongoose.Schema({
    name:{type:String,required:true}, 
    description:{type:String,required:true}, 
    userId:{type:String,required:true},  
    service:[{type: Schema.Types.ObjectId, ref: 'service'}],   
})

module.exports = mongoose.model('calendar',calendarSchema);