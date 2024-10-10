const express = require('express');
const mongoose = require('mongoose');
const app = express();
const statsRoute = require('./src/routes/stats');
const deviationRoute = require('./src/routes/deviation');

require('dotenv').config();
require('./src/jobs/cronJob');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database Connected'))
    .catch(err => console.log('Database connection error:', err));

app.use('/api', statsRoute);
app.use('/api', deviationRoute);
app.listen(3000, () => console.log('Server running on port 3000'));
