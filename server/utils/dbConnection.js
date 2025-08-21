const mongoose = require('mongoose');
const logger = require('../logger')
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Database connected successfully");
    
  } catch (error) {
    logger.error("Database connection failed", error);
    process.exit(1); // Exit the process with failure
  }
}

module.exports = dbConnection;