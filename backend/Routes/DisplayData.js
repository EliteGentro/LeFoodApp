const express = require('express');
const router = express.Router();

// Endpoint to retrieve food data
router.post('/foodData', async (req, res) => {
    try {
        // Send global food items and categories as response
        res.send([global.food_items, global.food_categories]);
    } catch (error) {
        console.error("Error: ", error); // Log error to console
        res.status(500).send("Error: " + error.message); // Send error message with status 500
    }
});

module.exports = router;
