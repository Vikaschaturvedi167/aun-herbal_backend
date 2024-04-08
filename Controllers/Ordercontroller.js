const Razorpay = require('razorpay');
const crypto = require('crypto');
const { orderModel } = require('../models/order');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

const checkout = async (req, res) => {
    try {
        const { Email, products, amount } = req.body;

        const order = await instance.orders.create({
            
            amount: amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        });

        await orderModel.create({
            order_id: order.id,
            Email : Email,
            products: products,
            amount: amount,
            
        });

        res.json({ order });
    } catch (error) {
        console.error("Error in checkout:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};







const verification = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        
        // Construct the data to verify the signature
        const bodyData = razorpay_order_id + "|" + razorpay_payment_id;

        // Generate the expected signature
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
                                         .update(bodyData)
                                         .digest('hex');

        // Check if the signature matches the expected signature
        const isValid = expectedSignature === razorpay_signature;

        if (isValid) {
            // Update the order with payment information
            const updatedOrder = await orderModel.findOneAndUpdate(
                { razorpay_order_id }, // Find the order by razorpay_order_id
                {
                    $set: {
                        razorpay_payment_id,
                        razorpay_signature
                    }
                },
                { new: true } // Return the updated document
            );

            // Redirect to success page with payment ID
            res.json({ message: "Payment verified successfully", updatedOrder });
        } else {
            res.status(400).json({ error: "Invalid signature" });
        }
    } catch (error) {
        console.error("Error in verification:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};













module.exports = { checkout, verification };
