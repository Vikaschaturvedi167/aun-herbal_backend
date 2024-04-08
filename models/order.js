const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
    Email :{type : String},
    // products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 } // Assuming default quantity is 1
    }],
    
    amount: { type: Number },//400
    email: {
        type: String,
        
      },
      
        
    
    order_id: { type: String },//xyz
    razorpay_payment_id: { type: String, default: null },//null
    razorpay_order_id: { type: String, default: null },
    razorpay_signature: { type: String, default: null }
})

const orderModel = mongoose.model('Order', orderSchema)

module.exports = { orderModel }