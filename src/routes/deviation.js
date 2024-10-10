const express = require('express');
const router = express.Router();
const Crypto = require('../models/crypto');

router.get('/deviation', async (req, res) => {
    const { coin } = req.query;
    const data = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
    if (data.length > 0) {
        const prices = data.map(item => item.price);
        const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
        const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;
        const deviation = Math.sqrt(variance);
        res.json({ deviation });
    } else {
        res.status(404).json({ error: 'Not enough data' });
    }
});

module.exports = router;
