const axios = require('axios');

const fetchCryptoData = async (coin) => {
    const options = {
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/simple/price',
        params: {
            x_cg_demo_api_key:process.env.x_cg_demo_api_key,
            ids: coin,
            vs_currencies: 'usd',
            include_market_cap: 'true',
            include_24hr_change: 'true'
        },
        headers: {accept:'application/json' }
    };

    try {
        const response = await axios.request(options);
        const data = response.data[coin];
        return {
            price: data.usd,
            marketCap: data.usd_market_cap,
            change24h: data.usd_24h_change
        };
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        throw error; 
    }
};

module.exports = fetchCryptoData;
