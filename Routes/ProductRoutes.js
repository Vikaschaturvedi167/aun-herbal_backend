// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../Controllers/ProductController');
const CartController = require('../Controllers/CartController');

const mongoose = require('mongoose');




router.use(authMiddleware);

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/add-to-cart/:productId', CartController.addToCart);

module.exports = router;
