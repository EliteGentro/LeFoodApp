const express = require('express');
const mongoDB = require('./db');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5500; // Use environment variable for port if available

// Middleware to set headers for CORS
app.use((req, res, next) => {
    const APP_URL = process.env.REACT_APP_URL || "http://localhost:5173";
    res.setHeader("Access-Control-Allow-Origin", APP_URL);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Connect to MongoDB
mongoDB();

// Route to handle root requests
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Middleware to parse JSON bodies
app.use(express.json());

// Routes for API endpoints
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
