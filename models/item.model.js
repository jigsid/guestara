const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./category.model");
const Subcategory = require("./subcategory.model");

const Item = sequelize.define(
  "Item",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
    subcategoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Subcategory,
        key: "id",
      },
    },
    taxApplicability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    tax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        validateTax(value) {
          if (this.taxApplicability && value === null) {
            throw new Error("Tax is required when tax is applicable");
          }
        },
      },
    },
    baseAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeValidate: (item) => {
        item.totalAmount =
          parseFloat(item.baseAmount) - parseFloat(item.discount || 0);
      },
    },
  }
);

// Define relationships
Item.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

Item.belongsTo(Subcategory, {
  foreignKey: "subcategoryId",
  as: "subcategory",
});

Category.hasMany(Item, {
  foreignKey: "categoryId",
  as: "items",
});

Subcategory.hasMany(Item, {
  foreignKey: "subcategoryId",
  as: "items",
});

module.exports = Item;
