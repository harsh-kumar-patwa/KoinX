const express = require('express');
const mongoose = require('mongoose');
const statsRoute = require('./src/routes/stats');
const deviationRoute = require('./src/routes/deviation');
const Crypto = require('./src/models/crypto');
const cron = require('node-cron');
const fetchCryptoData = require('./src/jobs/fetchCryptoData');


const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database Connected'))
    .catch(err => console.log('Database connection error:', err));

const fetchAndStoreData = async () => {
    try {
        const bitcoinData = await fetchCryptoData('bitcoin');
        const maticData = await fetchCryptoData('matic-network');
        const ethereumData = await fetchCryptoData('ethereum');
        
        await Crypto.create([bitcoinData, maticData, ethereumData]);
        console.log('Data fetched and stored:', { bitcoinData, maticData, ethereumData });
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
    }
};

fetchAndStoreData();
cron.schedule('0 */2 * * *', fetchAndStoreData);

app.use('/api', statsRoute);
app.use('/api', deviationRoute);
app.listen(PORT, () => console.log('Server running on port 3000'));
