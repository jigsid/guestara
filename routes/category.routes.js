const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

// Create a new category
router.post("/", categoryController.create);

// Get all categories
router.get("/", categoryController.findAll);

// Get category by ID or name
router.get("/:id", categoryController.findOne);

// Update category
router.put("/:id", categoryController.update);

module.exports = router;
