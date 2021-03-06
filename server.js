const express = require('express');
require('dotenv').config();
const connectDatabase = require('./config/database');

const app = express();

//Connect to database.
connectDatabase();

//Initialize middleware (body parser) (enable req.body).
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('Flexer is live.');
});

//Define routes.
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

//Specify port number.
const PORT = process.env.PORT || 5000;

//Run app.
app.listen(PORT, () => console.log(`Flexer running on port ${PORT}.`));
