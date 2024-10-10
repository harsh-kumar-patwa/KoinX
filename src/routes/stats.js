const express = require('express');
const router = express.Router();
const Crypto = require('../models/crypto');

router.get('/stats', async (req, res) => {
    const { coin } = req.query;
    const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
    if (latestData) {
        res.json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            "24hChange": latestData.change24h
        });
    } else {
        res.status(404).json({ error: 'Data not found' });
    }
});

module.exports = router;
