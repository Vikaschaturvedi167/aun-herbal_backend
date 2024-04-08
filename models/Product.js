// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 50 },
  picture: { type: String, required: true },
  description: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', "Both"], required: true },
  benefits: {type : String, required: true},
  dosage: {type : String, required: true},
  
  price: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
