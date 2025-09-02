const express = require("express");
const router = express.Router();
const Content = require("../models/content.model");
const ApiError = require("../utils/ApiError");

// Get all content
router.get("/", async (req, res, next) => {
  try {
    const content = await Content.findAll();
    res.json(content);
  } catch (error) {
    next(new ApiError(500, "Failed to fetch content"));
  }
});

// Get specific section
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const content = await Content.findByPk(id);
    
    if (!content) {
      return next(new ApiError(404, "Content not found"));
    }
    
    res.json(content);
  } catch (error) {
    next(new ApiError(500, "Failed to fetch content"));
  }
});

// Update section
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, subtitle, description } = req.body;
    
    const [updated] = await Content.update(
      { title, subtitle, description },
      { where: { id } }
    );
    
    if (updated) {
      const updatedContent = await Content.findByPk(id);
      res.json(updatedContent);
    } else {
      next(new ApiError(404, "Content not found"));
    }
  } catch (error) {
    next(new ApiError(500, "Failed to update content"));
  }
});

module.exports = router;