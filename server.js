const express = require('express');
require('dotenv').config();
const connectDatabase = require('./config/database');

const app = express();

//Connect to database.
connectDatabase();

app.get('/', (req, res) => {
  res.send('hello');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Flexer running on port ${PORT}`));
