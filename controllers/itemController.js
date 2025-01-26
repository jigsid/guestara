const Item = require("../models/item");
const Category = require("../models/category");
const Subcategory = require("../models/subcategory");

// Create a new item
exports.createItem = async (req, res) => {
  try {
    // Verify category exists
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Verify subcategory if provided
    if (req.body.subcategory) {
      const subcategory = await Subcategory.findById(req.body.subcategory);
      if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }
      // Verify subcategory belongs to the specified category
      if (subcategory.category.toString() !== req.body.category) {
        return res.status(400).json({
          message: "Subcategory does not belong to the specified category",
        });
      }
    }

    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate("category")
      .populate("subcategory");
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get items by category
exports.getItemsByCategory = async (req, res) => {
  try {
    const items = await Item.find({ category: req.params.categoryId })
      .populate("category")
      .populate("subcategory");
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get items by subcategory
exports.getItemsBySubcategory = async (req, res) => {
  try {
    const items = await Item.find({ subcategory: req.params.subcategoryId })
      .populate("category")
      .populate("subcategory");
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate("category")
      .populate("subcategory");
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("category")
      .populate("subcategory");

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Search items by name
exports.searchItems = async (req, res) => {
  try {
    const searchQuery = req.query.name;
    if (!searchQuery) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const items = await Item.find({
      name: { $regex: searchQuery, $options: "i" },
    })
      .populate("category")
      .populate("subcategory");

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
