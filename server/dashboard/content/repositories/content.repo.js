const Content = require("../models/content.model");

exports.create = async (data) => {
  return await Content.create(data);
};

exports.findAll = async () => {
  return await Content.findAll();
};

exports.findBySection = async (section) => {
  return await Content.findOne({ where: { section } });
};

exports.update = async (section, data) => {
  const content = await Content.findOne({ where: { section } });
  if (!content) throw new Error("Content not found");
  return await content.update(data);
};

exports.delete = async (section) => {
  const content = await Content.findOne({ where: { section } });
  if (!content) throw new Error("Content not found");
  return await content.destroy();
};
