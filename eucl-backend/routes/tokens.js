const express = require('express');
const router = express.Router();
const Token = require('../models/Token');

// Generate Token
router.post('/generate-token', async (req, res) => {
    const { meterNumber, amount } = req.body;   
    console.log("The req body is=> ",req.body);
    if (!meterNumber || meterNumber.length !== 6) {
        return res.status(400).json({ message: 'Invalid meter number' });
    }

    if (amount < 100 || amount % 100 !== 0) {
        return res.status(400).json({ message: 'Amount should be multiples of 100 and at least 100 Rwf' });
    }

    const days = amount / 100;
    if (days > 365 * 5) {
        return res.status(400).json({ message: 'Amount exceeds maximum allowable days (5 years)' });
    }

    const token = String(Math.floor(10000000 + Math.random() * 90000000));
    console.log(token)
    const newToken = new Token({
        meterNumber,
        token,
        tokenStatus: 'NEW',
        tokenValueDays: days,
        amount
    });

    try {
        await newToken.save();
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Validate Token
router.post('/validate-token', async (req, res) => {
    const { token } = req.body;

    try {
        const foundToken = await Token.findOne({ token });
        if (!foundToken) {
            return res.status(400).json({ message: 'Invalid token' });
        }
        res.json({ days: foundToken.tokenValueDays });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Tokens by Meter Number
router.get('/tokens/:meterNumber', async (req, res) => {
    const { meterNumber } = req.params;

    try {
        const tokens = await Token.find({ meterNumber });
        res.json(tokens);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
