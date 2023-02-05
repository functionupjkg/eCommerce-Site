const mongoose = require('mongoose')


const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true 
    },
    lastName: {
        type: String,
        required: true 
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    DOB : {
        type: Date,
        required: true
    },
    emailID : {
        type: String,
        required : true,
        unique: true,
        trim: true,
        lowercase: true
    },
    address :{
        type: String,
        required: true
    },
    customerID :{
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "ACTIVE",
        enum : ["ACTIVE", "INACTIVE"]
    },
    isDeleted: {
        type: Boolean,
        default : false
    }    
}, { timestamps: true } )

module.exports = mongoose.model('customer', customerSchema) // customers