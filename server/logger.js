const winston = require('winston');
const path = require('path');
const moment = require('moment-timezone');
require('winston-daily-rotate-file');

const { combine, printf } = winston.format;

// IST timestamp
const timestampIST = winston.format((info) => {
    info.timestamp = moment().tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss');
    return info;
});

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level.toUpperCase()}: ${message}`;
});

// Create transport with daily rotation
const rotatingTransport = new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, 'logs', 'app-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxFiles: '7d', // <--- Delete after 7 days
    level: 'info',
});

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestampIST(),
        logFormat
    ),
    transports: [
        new winston.transports.Console(),
        rotatingTransport,
        new winston.transports.File({
            filename: path.join(__dirname, 'logs', 'error.log'),
            level: 'error'
        })
    ]
});

module.exports = logger;
