// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();



const authRoutes = require('./Routes/AuthRoutes');
const productRoutes = require('./Routes/ProductRoutes');
const cartRoutes = require('./Routes/CartRout');
const addressRoutes = require('./Routes/AddressRout');
const paymentRouter = require('./Routes/OrderRoute')
const app = express();

// Middleware
app.use(express.json());

app.use(
    cors({
        origin: '*',
    })
);

app.get('/', (req, res) => {
    res.send('Hello, Aun Herbal');
  });

// Routes
app.use('/api', authRoutes);
app.use('/payment', paymentRouter);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes); // Add this line
app.use('/api', addressRoutes);




// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  

}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error.message);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
