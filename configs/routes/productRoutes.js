const express = require("express");
const productRoutes = express.Router();
const ProductController = require("../../app/controllers/productController");

// Create a new user record
productRoutes.post("/", ProductController.create);

// Get all user records
productRoutes.get("/", ProductController.index);

// Get a single user record by ID
productRoutes.get("/:id", ProductController.show);

// Update a user record
productRoutes.put("/:id", ProductController.update);

// Delete a user record
productRoutes.delete("/:id", ProductController.destroy);

module.exports = productRoutes;
