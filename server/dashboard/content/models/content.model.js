const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/database");

const Content = sequelize.define("Content", {
  id: {
    type: DataTypes.STRING, // تغيير من INTEGER إلى STRING
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'contents', // تأكد من اسم الجدول
  timestamps: true, // تأكد من وجود الحقول الزمنية
});

module.exports = Content;