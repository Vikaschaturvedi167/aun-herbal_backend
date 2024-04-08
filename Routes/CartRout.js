
// cartRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');
const cartController = require('../Controllers/CartController');

router.use(authMiddleware);

router.post('/add-to-cart', cartController.addToCart);
router.get('/cart-items/:userId', cartController.getCartItems); // Include userId parameter
router.delete('/remove-from-cart/:userId/:productId', cartController.removeFromCart); // Include userId and productId parameters
router.put('/update-cart-item-quantity', cartController.updateCartItemQuantity);

module.exports = router;
