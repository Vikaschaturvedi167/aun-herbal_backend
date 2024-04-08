const express = require('express');
const payment = express.Router();
const { checkout, verification }=require('../Controllers/Ordercontroller')


payment.post('/checkout', checkout)
payment.post('/verification', verification)

module.exports = payment;