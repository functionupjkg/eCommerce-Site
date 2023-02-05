const cardModel = require("../model/cardModel")
const customerModel = require("../model/customerModel")
const { isValidObjectId, isValidString, isValidVision } = require("../validation/validate");



const createCard = async (req, res) => {
    try {

        let data = req.body;
        let id = req.params.customerId;
        // let {cardNumber, cardType , customerName, status, vision, customerID} = data;

        if (!data) return res.status(400).send({ status: false, message: "Data required for create card" })
        if (Object.keys(data).length == 0) return res.status(404).send({ status: false, message: "Required data" })
        if (!isValidObjectId(id)) return res.status(400).send({ status: false, message: "Invalid customer ID" })

        if (data.cardType) {
            if (!["Regular", "Special"].includes(data.cardType))
                return res.status(400).send({ status: false, message: "CardType should be Regular or Special only" })
        }

        if (!data.customerName) return res.status(400).send({ status: false, message: "Customer Name is required" });
        if (!isValidString(data.customerName)) return res.status(400).send({ status: false, message: "Invalid CustomerName !" });

        if (data.status) {
            if (!["ACTIVE", "INACTIVE"].includes(data.status))
                return res.status(400).send({ status: false, message: "Status should be ACTIVE or INACTIVE only" });
        }

        if (!data.vision) return res.status(400).send({ status: false, message: "Vision is required" });
        // if (!isValidVision(data.vision)) return res.status(400).send({ status: false, message: "Invalid Vision !" });

        let customerData = await customerModel.findOne({_id: id})
        console.log(customerData)
        if (!customerData) return res.status(404).send({ status: false, message: "Customer does not exist." });

        let allcard = await customerModel.find()

        data.cardNumber = (`C00${allcard.length + 1}`)

        data.customerID = customerData.customerID


        console.log(data)
        const newCard = await cardModel.create(data)
        return res.status(201).send({ status: true, message: "Card created successfully", Data: newCard })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}


//-----------------------------------[ Get All Card list - API ]---------------------------------------------//

let getAllCard = async (req, res) => {
    try {
        let data = req.query;

        if (data.cardNumber) {
            if (!isValidString(data.cardNumber)) return res.status(400).send({ status: false, message: "Invalid customer ID" })
            data.cardNumber = data.cardNumber;
        }

        if (data.status) {
            if (!["ACTIVE", "INACTIVE"].includes(data.status))
                return res.status(400).send({ status: false, message: "Status should be ACTIVE or INACTIVE only" });
           data.status = data.status;
        }

        if (data.cardType) {
            if (!["Regular", "Special"].includes(data.cardType))
                return res.status(400).send({ status: false, message: "CardType should be Regular or Special only" })
                data.cardType = data.cardType;
        }

        if (data.customerId) {
            if (!isValidObjectId(data.customerId)) return res.status(400).send({ status: false, message: "Invalid customer ID" })
            data.customerId = data.customerId;
        }




        let allCard = await cardModel.find({ isDeleted: false }).select({ isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        if (allCard.length == 0) {
            return res.status(404).send({ status: false, message: "No Such Card exist", Data: allCustomer })
        }
        return res.status(200).send({ status: true, message: "All Card List", Data: allCard })

    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}






module.exports = { createCard, getAllCard }