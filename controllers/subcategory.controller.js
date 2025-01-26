const Subcategory = require("../models/subcategory.model");
const Category = require("../models/category.model");

// Create a new subcategory
exports.create = async (req, res) => {
  try {
    const category = await Category.findByPk(req.body.categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const subcategory = await Subcategory.create({
      ...req.body,
      taxApplicability: req.body.taxApplicability ?? category.taxApplicability,
      tax: req.body.tax ?? category.tax,
    });

    const subcategoryWithCategory = await Subcategory.findByPk(subcategory.id, {
      include: [{ model: Category, as: "category" }],
    });

    res.status(201).json(subcategoryWithCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all subcategories
exports.findAll = async (req, res) => {
  try {
    const subcategories = await Subcategory.findAll({
      include: [{ model: Category, as: "category" }],
    });
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get subcategories by category
exports.findByCategory = async (req, res) => {
  try {
    const subcategories = await Subcategory.findAll({
      where: { categoryId: req.params.categoryId },
      include: [{ model: Category, as: "category" }],
    });
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get subcategory by ID or name
exports.findOne = async (req, res) => {
  try {
    const query = isNaN(req.params.id)
      ? { where: { name: req.params.id } }
      : { where: { id: req.params.id } };

    query.include = [{ model: Category, as: "category" }];

    const subcategory = await Subcategory.findOne(query);

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update subcategory
exports.update = async (req, res) => {
  try {
    const [updated] = await Subcategory.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      individualHooks: true,
    });

    if (updated === 0) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    const subcategory = await Subcategory.findByPk(req.params.id, {
      include: [{ model: Category, as: "category" }],
    });
    res.json(subcategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
