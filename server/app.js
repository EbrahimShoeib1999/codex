require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const contentRoutes = require("./dashboard/content/routes/content.routes");
const ApiError = require("./dashboard/content/utils/ApiError");

const app = express();

// ✅ ضع CORS في البداية قبل أي routes
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // جميع منافذ التطوير
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/content", contentRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  return res.status(500).json({ error: "Internal Server Error" });
});

// Start server
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
    await sequelize.sync({ alter: true });

    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
  }
})();