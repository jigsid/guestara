const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategoryController");

// Create a new subcategory
router.post("/", subcategoryController.createSubcategory);

// Get all subcategories
router.get("/", subcategoryController.getAllSubcategories);

// Get subcategories by category
router.get(
  "/category/:categoryId",
  subcategoryController.getSubcategoriesByCategory
);

// Get subcategory by ID
router.get("/id/:id", subcategoryController.getSubcategoryById);

// Get subcategory by name
router.get("/name/:name", subcategoryController.getSubcategoryByName);

// Update subcategory
router.put("/:id", subcategoryController.updateSubcategory);

module.exports = router;
