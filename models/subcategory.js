const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    taxApplicability: {
      type: Boolean,
      required: true,
    },
    tax: {
      type: Number,
      required: function () {
        return this.taxApplicability;
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subcategory", subcategorySchema);
