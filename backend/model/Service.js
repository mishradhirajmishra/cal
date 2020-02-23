const mongoose  = require('mongoose');

const serviceSchema = mongoose.Schema({
    name:{type:String,required:true}, 
    duration:{type:Number,default:30}, 
    rest:{type:Number,default:0}, 
    price:{type:Number,default:100}, 
    userId:{type:String,required:true},  
    maxAllowed:{type:Number,default:1},   
    maxAdvanceBookingDay:{type:Number,default:30},  
    startDate:{type:String,required:true},  
    endDate:{type:String},  
    day0:{type:String},      
    day1:{type:String},  
    day2:{type:String},  
    day3:{type:String},  
    day4:{type:String},  
    day5:{type:String},  
    day6:{type:String},  
    day0bookingSlot:[], 
    day1bookingSlot:[], 
    day2bookingSlot:[], 
    day3bookingSlot:[], 
    day4bookingSlot:[], 
    day5bookingSlot:[], 
    day6bookingSlot:[],    
})
module.exports = mongoose.model('service',serviceSchema);