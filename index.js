// Load environment variables based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
require("dotenv").config({ path: envFile });

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// create log folder and production.log file if they don't exist using fs
const fs = require('fs');
const path = require('path');
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}
const logFile = path.join(logDir, `${process.env.NODE_ENV || "development"}` + '.log');
if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile, '', { flag: 'w' });
}

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
// Middleware to serve static files (if needed)
// app.use(express.static('public')); // Uncomment if you have a public directory for static files

const { logger, requestLogger } = require('./configs/logger');
app.use((req, res, next) => {
  requestLogger(req, res, next);
});

// Middleware for logging requests (optional, can use morgan or similar)
const morgan = require('morgan'); // Uncomment if you want to use morgan
app.use(morgan('dev')); // Use 'dev' format for logging requests

// Middleware for error handling (optional, can customize as needed)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Middleware for CORS (if needed)
// const cors = require('cors'); // Uncomment if you want to enable CORS
// app.use(cors()); // Enable CORS for all routes, customize as needed

// Import routes
const routes = require('./configs/routes');
// Set up the view engine (if needed)
// app.set('view engine', 'ejs'); // Example for EJS, adjust as needed
// app.set('views', path.join(__dirname, 'views')); // Set views directory if using a view engine

// Root path route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Use the imported routes
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
