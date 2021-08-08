const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
  try {
    await mongoose.connect(
      // Getting MongoDB connection string from default.json
      config.get('mongoURI'), 
      {
        // To fix deprecation warnings from Mongoose
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log('DB Connected');
      },
    );
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;