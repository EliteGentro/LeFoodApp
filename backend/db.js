const mongoose = require('mongoose');
require('dotenv').config(); 
const mongoURI = process.env.MONGO_URI;

// Function to establish connection to MongoDB and fetch food items and categories
const mongoDB = async () => {
    try {
        // Establish connection to MongoDB
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");

        // Fetch food items data
        const items_data = await mongoose.connection.collection("food_items");
        const itemsArray = await items_data.find({}).toArray();

        // Fetch food categories data
        const category_data = await mongoose.connection.collection("food_categories");
        const categoriesArray = await category_data.find({}).toArray();
        
        // Store fetched data in global variables
        global.food_items = itemsArray;
        global.food_categories = categoriesArray;
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);  // Exit the process if there's an error
    }
};

module.exports = mongoDB;
