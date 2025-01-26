const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.controller");

// Create a new item
router.post("/", itemController.create);

// Get all items
router.get("/", itemController.findAll);

// Search items by name
router.get("/search", itemController.search);

// Get items by category
router.get("/category/:categoryId", itemController.findByCategory);

// Get items by subcategory
router.get("/subcategory/:subcategoryId", itemController.findBySubcategory);

// Get item by ID or name
router.get("/:id", itemController.findOne);

// Update item
router.put("/:id", itemController.update);

module.exports = router;
