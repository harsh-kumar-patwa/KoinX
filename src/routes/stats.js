const express = require('express');
const router = express.Router();
const Crypto = require('../models/crypto');

router.get('/stats', async (req, res) => {
    try{
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
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
