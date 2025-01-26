const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

// Create a new item
router.post("/", itemController.createItem);

// Get all items
router.get("/", itemController.getAllItems);

// Search items by name
router.get("/search", itemController.searchItems);

// Get items by category
router.get("/category/:categoryId", itemController.getItemsByCategory);

// Get items by subcategory
router.get("/subcategory/:subcategoryId", itemController.getItemsBySubcategory);

// Get item by ID
router.get("/id/:id", itemController.getItemById);

// Update item
router.put("/:id", itemController.updateItem);

module.exports = router;
