const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,default: null },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true,default: null },
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model('Cart', cartSchema);
