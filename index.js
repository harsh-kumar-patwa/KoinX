const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();
// require('./src/jobs/cronJob');

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('Database Connected'))
.catch(err=>console.log(err));

app.listen(3000,()=> console.log('Server running on port 3000'));
