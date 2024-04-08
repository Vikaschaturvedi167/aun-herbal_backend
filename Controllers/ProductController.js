// controllers/productController.js
const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createProduct = async (req, res) => {
  const { name, picture, description, gender, benefits,dosage, price } = req.body;

  try {
    const product = new Product({
      name,
      picture,
      description,
      gender,
      benefits,
      dosage,
      
      price
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // Validate req.body here if needed

    const product = await Product.findByIdAndUpdate(
      id,
      { ...req.body, updated_at: Date.now() },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    console.log('Product updated:', product);
    return res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(202).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
