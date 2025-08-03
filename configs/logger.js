const fs = require('fs');
const path = require('path');

// Log file path
const logFilePath = path.join(__dirname, `../logs/${process.env.NODE_ENV}.log`);
const maxLogSize = 3 * 1024 * 1024; // 3 MB

// Format log messages
function formatLog({ source, level, message, meta }) {
  const timestamp = new Date().toISOString();
  let log = `[${timestamp}] [${level.toUpperCase()}] [${source}] ${message}`;
  if (meta) {
    log += ` | ${JSON.stringify(meta)}`;
  }
  return log;
}

// Rotate log file if size exceeds maxLogSize
function rotateLogFile() {
  if (fs.existsSync(logFilePath)) {
    const stats = fs.statSync(logFilePath);
    if (stats.size >= maxLogSize) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const rotatedFile = logFilePath.replace(/\.log$/, `-${timestamp}.log`);
      fs.renameSync(logFilePath, rotatedFile);
    }
  }
}

// Write log to file
function writeLog(log) {
  rotateLogFile();
  fs.appendFile(logFilePath, log + '\n', err => {
    if (err) console.error('Failed to write log:', err);
  });
}

// Custom logger
const logger = {
  log: (level, source, message, meta) => {
    const log = formatLog({ source, level, message, meta });
    writeLog(log);
  },
  info: (source, message, meta) => logger.log('info', source, message, meta),
  warn: (source, message, meta) => logger.log('warn', source, message, meta),
  error: (source, message, meta) => logger.log('error', source, message, meta),
};

// Express middleware for request logging
function requestLogger(req, res, next) {
  const { method, url, headers, params, query, body } = req;
  logger.info('request', `${method} ${url} | ${res.statusCode}`, { headers, params, query, body});
  next();
}

module.exports = { logger, requestLogger };