const express = require('express');
const router = express.Router();
const customerController = require("../controller/customerController")
const cardController = require("../controller/cardController")





router.post('/customer', customerController.createCustomer)
router.get('/customer', customerController.getAllCustomer)
router.delete('/customer', customerController.deleteCustomer)

router.post('/card/:customerId', cardController.createCard)
router.get('/card', cardController.getAllCard)




module.exports = router;
