// const { createLogger } = require('./Logger.util');

// const requestTracker = (req, res, next) => {
//   const logger = createLogger(req.url.split('/')[1]);
//   logger.info(`Incoming request: ${req.method} ${req.url}`);
//   next();
// };



module.exports = { requestTracker };
const { logger, logToCloudWatch, getLogStreamName } = require('./Logger.util');
const requestTracker = (req, res, next) => {
  const logger = logger(req.url.split('/')[1]);
  if(req.url.split('/')[1] === 'user'){
  let logGroupName = '/api/user-api';
  const logStreamName = getLogStreamName();
  logToCloudWatch(logGroupName, logStreamName, 'User API accessed');
  logger.info('User API accessed');
  res.send('User API');
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
}
};
