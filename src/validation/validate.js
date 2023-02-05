const mongoose = require('mongoose');
const isValidObjectId = function (objectId) {
    return mongoose.isValidObjectId(objectId);
}

//<<----------------Validation for string ---------------->>
const isValidString = function (string) {
    return (/^[A-Za-z]+$/).test(string)
}

//<<----------------Validation for Mobile No. ---------------->>
const isValidMob = function (phone) {
    return (/^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$/).test(phone);
}

//<<----------------Validation for Mobile No. ---------------->>
const isValidDob = function (dob) {
    return (/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/((19|20)\d\d)/).test(dob);
}

//<<----------------Validation for Email ---------------->>  
const isValidEmail = function (email) {
    return (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(email);
}

//<<----------------Validation for Email ---------------->>  
const isValidVision = function (email) {
    return (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(email);
}

const isValidAdd = function (value) {
    if (typeof value == "undefined" || value == null || typeof value === "boolean" || typeof value === "number") return false
    if (typeof value == "string" && value.trim().length == 0) return false
    return true
}


module.exports = {
    isValidString,
    isValidMob,
    isValidDob,
    isValidEmail,
    isValidAdd,
    isValidObjectId,
    isValidVision
}