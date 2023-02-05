
const customerModel = require("../model/customerModel");
const uuid = require("uuid");
const { isValidObjectId, isValidString, isValidMob, isValidDob, isValidEmail, isValidAdd } = require("../validation/validate");




//--------------------------------------------[Create Customer API ]-------------------------------------------------------//

const createCustomer = async (req, res) => {
    try {

        let data = req.body;
        // let {firstName, lastName , mobileNumber, DOB, emailID, address, customerID} = data;

        if (!data) return res.status(400).send({ status: false, message: "Data required for create customer" })
        if (Object.keys(data).length == 0) return res.status(404).send({ status: false, message: "Required data" })

        if (!data.firstName) return res.status(400).send({ status: false, message: "firstName is required" });
        if (!isValidString(data.firstName)) return res.status(400).send({ status: false, message: "Invalid firstName !" });

        if (!data.firstName) return res.status(400).send({ status: false, message: "firstName is required" });
        if (!isValidString(data.lastName)) return res.status(400).send({ status: false, message: "Invalid lastName !" });

        if (!data.mobileNumber) return res.status(400).send({ status: false, message: "Mobile No. is required" });
        if (!isValidMob(data.mobileNumber)) return res.status(400).send({ status: false, message: "Invalid Mobile Number !" });

        if (!data.DOB) return res.status(400).send({ status: false, message: "Date of Birth is required" });
        if (!isValidDob(data.DOB)) return res.status(400).send({ status: false, message: "Invalid Date of Birth !" });

        if (!data.emailID) return res.status(400).send({ status: false, message: "EmailId is required" });
        if (!isValidEmail(data.emailID)) return res.status(400).send({ status: false, message: "Invalid EmailID !" });

        if (!data.address) return res.status(400).send({ status: false, message: "Address is required" });
        if (!isValidAdd(data.address)) return res.status(400).send({ status: false, message: "Invalid Address !" });

        if (data.status) {
            if (!["ACTIVE", "INACTIVE"].includes(data.status))
                return res.status(400).send({ status: false, message: "Status should be ACTIVE or INACTIVE only" });
            data.status = data.status
        }
        data.customerID = uuid.v4();

        let isExitMob = await customerModel.findOne({ mobileNumber: data.mobileNumber })
        if (isExitMob) return res.status(400).send({ status: false, message: "Mobile No. already exists ! Try another." })

        let isExitEmail = await customerModel.findOne({ emailID: data.emailID })
        if (isExitEmail) return res.status(400).send({ status: false, message: "EmailID already exists ! Try another." })

        console.log(data)
        const customer = await customerModel.create(data)
        return res.status(201).send({ status: true, message: "Customer created successfully", Data: customer })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}


//-----------------------------------[ Get All Customer list with Status Active - API ]---------------------------------------------//

let getAllCustomer = async (req, res) => {
    try {
        let data = req.query;

        if (data.status) {
            if (!["ACTIVE", "INACTIVE"].includes(data.status))
                return res.status(400).send({ status: false, message: "Status should be ACTIVE or INACTIVE only" });
            let allCustomer = await customerModel.find({ isDeleted: false, status: data.status }).select({ isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 })
            if (!allCustomer) return res.status(404).send({ status: false, message: "Customer not found" })
            return res.status(200).send({ status: true, message: "All Customer List", Data: allCustomer })
        }

        let allCustomer = await customerModel.find({ isDeleted: false, status: "ACTIVE" }).select({ isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        if(allCustomer.length == 0 ) {
            return res.status(404).send({ status: false, message: "No Such Active Customer List", Data: allCustomer })
        }
        return res.status(200).send({ status: true, message: "All Active Customer List", Data: allCustomer })

    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}



//-----------------------------------[ Delete Customer - API ]---------------------------------------------//

let deleteCustomer = async (req, res) => {
    try {
        let data = req.query;

        let filter = { isDeleted: false }

        if (data.status) {
            if (!["ACTIVE", "INACTIVE"].includes(data.status))
                return res.status(400).send({ status: false, message: "Status should be ACTIVE or INACTIVE only" });
            filter.status = data.status;

        }
        if (data.firstName) {
            if (!data.firstName) return res.status(400).send({ status: false, message: "firstName is required" });
            if (!isValidString(data.firstName)) return res.status(400).send({ status: false, message: "Invalid firstName !" })
            filter.firstName = data.firstName
        }

        if (data.lastName) {
            if (!data.firstName) return res.status(400).send({ status: false, message: "firstName is required" });
            if (!isValidString(data.lastName)) return res.status(400).send({ status: false, message: "Invalid lastName !" })
            filter.lastName = data.lastName
        }

        if (data.mobileNumber) {
            if (!data.mobileNumber) return res.status(400).send({ status: false, message: "Mobile No. is required" });
            if (!isValidMob(data.mobileNumber)) return res.status(400).send({ status: false, message: "Invalid Mobile Number !" })
            filter.mobileNumber = data.mobileNumber
        };
        if (data.DOB) {
            if (!data.DOB) return res.status(400).send({ status: false, message: "Date of Birth is required" });
            if (!isValidDob(data.DOB)) return res.status(400).send({ status: false, message: "Invalid Date of Birth !" })
            filter.DOB = data.DOB
        }
        if (data.emailID) {
            if (!data.emailID) return res.status(400).send({ status: false, message: "EmailId is required" });
            if (!isValidEmail(data.emailID)) return res.status(400).send({ status: false, message: "Invalid EmailID !" })
            filter.emailID = data.emailID
        }
        // console.log(filter)
        let updatedData = await customerModel.updateMany(filter, { $set: { isDeleted: true } })
        // console.log(updatedData, 122)
        if (updatedData.modifiedCount == 0) {
            return res.status(404).send({ status: false, message: "Such Customer Data not found" })
        }
        return res.status(200).send({ status: true, message: "Customer Deleted Successfully" })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}






module.exports = { createCustomer, getAllCustomer, deleteCustomer };