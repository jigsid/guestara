const Item = require("../models/item.model");
const Category = require("../models/category.model");
const Subcategory = require("../models/subcategory.model");
const { Op } = require("sequelize");

// Create a new item
exports.create = async (req, res) => {
  try {
    const category = await Category.findByPk(req.body.categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (req.body.subcategoryId) {
      const subcategory = await Subcategory.findByPk(req.body.subcategoryId);
      if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }
    }

    const item = await Item.create({
      ...req.body,
      taxApplicability: req.body.taxApplicability ?? category.taxApplicability,
      tax: req.body.tax ?? category.tax,
    });

    const itemWithRelations = await Item.findByPk(item.id, {
      include: [
        { model: Category, as: "category" },
        { model: Subcategory, as: "subcategory" },
      ],
    });

    res.status(201).json(itemWithRelations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all items
exports.findAll = async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [
        { model: Category, as: "category" },
        { model: Subcategory, as: "subcategory" },
      ],
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get items by category
exports.findByCategory = async (req, res) => {
  try {
    const items = await Item.findAll({
      where: { categoryId: req.params.categoryId },
      include: [
        { model: Category, as: "category" },
        { model: Subcategory, as: "subcategory" },
      ],
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get items by subcategory
exports.findBySubcategory = async (req, res) => {
  try {
    const items = await Item.findAll({
      where: { subcategoryId: req.params.subcategoryId },
      include: [
        { model: Category, as: "category" },
        { model: Subcategory, as: "subcategory" },
      ],
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get item by ID or name
exports.findOne = async (req, res) => {
  try {
    const query = isNaN(req.params.id)
      ? { where: { name: req.params.id } }
      : { where: { id: req.params.id } };

    query.include = [
      { model: Category, as: "category" },
      { model: Subcategory, as: "subcategory" },
    ];

    const item = await Item.findOne(query);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update item
exports.update = async (req, res) => {
  try {
    const [updated] = await Item.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      individualHooks: true,
    });

    if (updated === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    const item = await Item.findByPk(req.params.id, {
      include: [
        { model: Category, as: "category" },
        { model: Subcategory, as: "subcategory" },
      ],
    });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Search items by name
exports.search = async (req, res) => {
  try {
    const searchQuery = req.query.name;
    if (!searchQuery) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const items = await Item.findAll({
      where: {
        name: {
          [Op.iLike]: `%${searchQuery}%`,
        },
      },
      include: [
        { model: Category, as: "category" },
        { model: Subcategory, as: "subcategory" },
      ],
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
