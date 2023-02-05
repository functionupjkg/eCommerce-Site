const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId;

const cardSchema = new mongoose.Schema({
    cardNumber: {
        type: String,
        
    },
    cardType: {
        type: String,
        default: "Regular",
        enum : ["Regular", "Special"]
    },
    customerName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "ACTIVE",
        enum : ["ACTIVE", "INACTIVE"]
    },
    vision: {
        type: String,
        required: true  
    },
    customerID :{
        type: String,
        ref : "customer",
        
    },
    isDeleted: {
        type: Boolean,
        default : false
    } 
    
    
}, { timestamps: true } )

module.exports = mongoose.model('card', cardSchema) // customers