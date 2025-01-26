const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./category.model");

const Subcategory = sequelize.define(
  "Subcategory",
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
  },
  {
    timestamps: true,
  }
);

// Define the relationship
Subcategory.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

Category.hasMany(Subcategory, {
  foreignKey: "categoryId",
  as: "subcategories",
});

module.exports = Subcategory;
