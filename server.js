const express = require('express');
const bodyParser = require('body-parser');

// Connect Database
const connectDB = require('./config/db');
connectDB();

// Middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/getusers', require('./routes/getUsers'));
app.use('/adduser', require('./routes/addUser'));
app.use('/deleteuser', require('./routes/deleteUser'));

// Start Server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});