const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategory.controller");

// Create a new subcategory
router.post("/", subcategoryController.create);

// Get all subcategories
router.get("/", subcategoryController.findAll);

// Get subcategories by category
router.get("/category/:categoryId", subcategoryController.findByCategory);

// Get subcategory by ID or name
router.get("/:id", subcategoryController.findOne);

// Update subcategory
router.put("/:id", subcategoryController.update);

module.exports = router;
