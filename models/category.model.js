const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    taxType: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        validateTaxType(value) {
          if (this.taxApplicability && value === null) {
            throw new Error("Tax type is required when tax is applicable");
          }
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Category;
