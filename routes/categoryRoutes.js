const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Create a new category
router.post("/", categoryController.createCategory);

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get category by ID
router.get("/id/:id", categoryController.getCategoryById);

// Get category by name
router.get("/name/:name", categoryController.getCategoryByName);

// Update category
router.put("/:id", categoryController.updateCategory);

module.exports = router;
