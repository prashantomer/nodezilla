const express = require("express");
const userRoutes = express.Router();
const UsersController = require("../../app/controllers/userController");


// Create a new user record
userRoutes.post("/", UsersController.create);

// Get all user records
userRoutes.get("/", UsersController.index);

// Get a single user record by ID
userRoutes.get("/:id", UsersController.show);

// Update a user record
userRoutes.put("/:id", UsersController.update);

// Delete a user record
userRoutes.delete("/:id", UsersController.destroy);

module.exports = userRoutes;
