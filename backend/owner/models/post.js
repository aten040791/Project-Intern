'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.Language, { foreignKey: 'language_id', as: 'language' });
      Post.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
    }
  }
  Post.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    file: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    language_id: DataTypes.INTEGER,
    slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};