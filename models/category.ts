'use strict';

import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface CategoryAttributes {
  id: number;
  name: string;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  id!: number;
  name!: string;

  static associate(models: { [key: string]: typeof Model }): void {
    // Define associations here if needed
  }
}

export default (sequelize: Sequelize) : typeof Category => {
  Category.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
}
