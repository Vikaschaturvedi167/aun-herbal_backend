// routes/addressRoutes.js

const express = require('express');
const router = express.Router();
const addressController = require('../Controllers/AdrressController');

// Create address
router.post('/addresses', addressController.createAddress);

// Get address by user ID
router.get('/addresses/:userId', addressController.getAddressByUserId);

// Update address
router.put('/addresses/:addressId', addressController.updateAddress);

// Delete address
router.delete('/addresses/:addressId', addressController.deleteAddress);

module.exports = router;
