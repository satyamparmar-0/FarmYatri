const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
const logger = require('./logger');
dotenv.config();
const dbConnection = require('./utils/dbConnection');
const userRoutes = require('./src/api/user/user.routes');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your client URL
    credentials: true, // Allow cookies to be sent
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();

app.use('/user', userRoutes);

app.listen(process.env.PORT, ()=>{
    // console.log(`Server is running on port ${process.env.PORT}`);
    logger.info(`Server started on port ${process.env.PORT}`);
})