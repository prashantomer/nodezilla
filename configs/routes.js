const express = require('express');
const router = express.Router();

// Import your route files here
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

// Use the imported routes
router.use('/api/users', userRoutes);
router.use('/api/products', productRoutes);

module.exports = router;
