const cron = require('node-cron');
const Crypto = require('../models/crypto');
const fetchCryptoData = require('./fetchCryptoData');

const coins = ['bitcoin', 'matic-network', 'ethereum'];

cron.schedule('0 */2 * * *', async () => {
    for (const coin of coins) {
        const cryptoData = await fetchCryptoData(coin);
        const newEntry = new Crypto({ coin, ...cryptoData });
        await newEntry.save();
        console.log(`Data saved for ${coin}`);
    }
});
