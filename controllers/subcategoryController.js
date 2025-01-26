const Subcategory = require("../models/subcategory");
const Category = require("../models/category");

// Create a new subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // If tax applicability is not provided, inherit from category
    if (req.body.taxApplicability === undefined) {
      req.body.taxApplicability = category.taxApplicability;
      if (category.taxApplicability) {
        req.body.tax = category.tax;
      }
    }

    const subcategory = new Subcategory(req.body);
    await subcategory.save();
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all subcategories
exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate("category");
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get subcategories by category
exports.getSubcategoriesByCategory = async (req, res) => {
  try {
    const subcategories = await Subcategory.find({
      category: req.params.categoryId,
    }).populate("category");
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get subcategory by ID
exports.getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id).populate(
      "category"
    );
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get subcategory by name
exports.getSubcategoryByName = async (req, res) => {
  try {
    const subcategory = await Subcategory.findOne({
      name: req.params.name,
    }).populate("category");
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update subcategory
exports.updateSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("category");

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.json(subcategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
