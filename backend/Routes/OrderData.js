const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Endpoint to handle order data submission
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    data.splice(0, 0, { Order_date: req.body.order_date }); // Add order date to the beginning of the order data array

    try {
        let eId = await Order.findOne({ 'email': req.body.email });
        console.log(eId);

        if (eId === null) {
            // Create a new order if no existing order is found for the email
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            res.json({ success: true });
        } else {
            // Update existing order by pushing new order data
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error: " + error.message); // Send error message with status 500
    }
});

// Endpoint to retrieve order data for a specific user
router.post('/myOrderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ 'email': req.body.email });
        res.json({ orderData: myData });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error: " + error.message); // Send error message with status 500
    }
});

module.exports = router;
