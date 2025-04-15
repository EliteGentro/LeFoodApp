const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator'); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "ThisIsATestSecret";

// Endpoint to check if an email already exists in the database
router.post("/checkemail", 
    [
        body('email').isEmail().withMessage('Invalid email format')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.json({ exists: true });
            } else {
                return res.json({exists: false });
            }
        } catch (error) {
            console.log("Error: ", error);
            return res.status(500).json({ error: "Server error" });
        }
    }
);

// Existing createuser endpoint
router.post("/createuser", 
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at 5 characters long')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const salt = await bcrypt.genSalt(10);
            let securePassword = await bcrypt.hash(req.body.password, salt);

            await User.create({
                name: req.body.name,
                password: securePassword,
                email : req.body.email,
                location: req.body.location
            });
            res.json({ success: true });
        } catch (error) {
            console.log("Error: ", error);
            return res.status(500).json({ error: "Server error" });
        }
    }
);

// Existing loginuser endpoint
router.post("/loginuser", 
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let userEmail = req.body.email;
            let userData = await User.findOne({ email: userEmail });
            if (!userData) {
                return res.status(400).json({ errors: "Incorrect Credentials" });
            }

            const passwordCompare = await bcrypt.compare(req.body.password, userData.password);
            if (!passwordCompare) {
                return res.status(400).json({ errors: "Incorrect Credentials" });
            }

            const data = {
                user: {
                    id: userData.id
                }
            };

            const authToken = jwt.sign(data, jwtSecret);
            res.json({ success: true, authToken: authToken });

        } catch (error) {
            console.log("Error: ", error);
            return res.status(500).json({ error: "Server error" });
        }
    }
);

module.exports = router;
