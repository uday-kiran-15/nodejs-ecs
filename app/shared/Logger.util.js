// const winston = require('winston');

// const createLogger = (logGroup) => {
//   return winston.createLogger({
//     level: 'info',
//     format: winston.format.json(),
//     transports: [
//       new winston.transports.Console(),
//       new winston.transports.File({ filename: `logs/${logGroup}.log` }),
//     ],
//   });
// };

// module.exports = { createLogger };
const winston = require('winston');
const AWS = require('aws-sdk');
const cloudWatchLogs = new AWS.CloudWatchLogs({ region: 'us-west-2' });

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

async function logToCloudWatch(logGroupName, logStreamName, message) {
  await cloudWatchLogs.createLogStream({
    logGroupName,
    logStreamName,
  }).promise();

  await cloudWatchLogs.putLogEvents({
    logGroupName,
    logStreamName,
    logEvents: [
      {
        message,
        timestamp: Date.now(),
      },
    ],
  }).promise();
}

function getLogStreamName() {
  const now = new Date();
  const timestamp = Math.floor(now.getTime() / (5 * 60 * 1000)) * (5 * 60 * 1000);
  return `stream-${new Date(timestamp).toISOString()}`;
}

module.exports = {
  logger,
  logToCloudWatch,
  getLogStreamName,
};
