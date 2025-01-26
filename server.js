const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");
const Category = require("./models/category.model");
const Subcategory = require("./models/subcategory.model");
const Item = require("./models/item.model");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const categoryRoutes = require("./routes/category.routes");
const subcategoryRoutes = require("./routes/subcategory.routes");
const itemRoutes = require("./routes/item.routes");

app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/items", itemRoutes);

// Database sync and server start
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Sync database models
    await sequelize.sync();
    console.log("Database synced successfully");

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
}

startServer();
