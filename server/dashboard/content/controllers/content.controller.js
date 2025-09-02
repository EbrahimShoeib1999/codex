const contentService = require("../services/content.service");

exports.createContent = async (req, res, next) => {
  try {
    const content = await contentService.createContent(req.body);
    res.status(201).json({ message: "Content created successfully", data: content });
  } catch (error) {
    next(error);
  }
};

exports.getAllContent = async (req, res, next) => {
  try {
    const contents = await contentService.getAllContent();
    res.json(contents);
  } catch (error) {
    next(error);
  }
};

exports.getContentBySection = async (req, res, next) => {
  try {
    const content = await contentService.getContentBySection(req.params.section);
    res.json(content);
  } catch (error) {
    next(error);
  }
};

exports.updateContent = async (req, res, next) => {
  try {
    const content = await contentService.updateContent(req.params.section, req.body);
    res.json({ message: "Content updated successfully", data: content });
  } catch (error) {
    next(error);
  }
};

exports.deleteContent = async (req, res, next) => {
  try {
    await contentService.deleteContent(req.params.section);
    res.json({ message: "Content deleted successfully" });
  } catch (error) {
    next(error);
  }
};
