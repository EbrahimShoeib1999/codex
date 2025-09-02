const contentRepo = require("../repositories/content.repo");

exports.createContent = async (data) => {
  return await contentRepo.create(data);
};

exports.getAllContent = async () => {
  return await contentRepo.findAll();
};

exports.getContentBySection = async (section) => {
  return await contentRepo.findBySection(section);
};

exports.updateContent = async (section, data) => {
  return await contentRepo.update(section, data);
};

exports.deleteContent = async (section) => {
  return await contentRepo.delete(section);
};
