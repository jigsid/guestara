const Category = require("../models/category.model");

// Create a new category
exports.create = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all categories
exports.findAll = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get category by ID or name
exports.findOne = async (req, res) => {
  try {
    const query = isNaN(req.params.id)
      ? { where: { name: req.params.id } }
      : { where: { id: req.params.id } };

    const category = await Category.findOne(query);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update category
exports.update = async (req, res) => {
  try {
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      individualHooks: true,
    });

    if (updated === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    const category = await Category.findByPk(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
