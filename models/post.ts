import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface PostAttributes {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  categoryId: number;
  userId: number;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public imageUrl?: string;
  public categoryId!: number;
  public userId!: number;

  static associate(models: { [key: string]: typeof Model }): void {
    // Define associations here if needed
      // Create a many-to-one association between Post and User
      Post.belongsTo(models.User as any, { foreignKey: 'userId', as: 'author' });

      // Create a many-to-one association between Post and Category
      Post.belongsTo(models.Category as any, { foreignKey: 'categoryId', as: 'postCategory' });
  }
}

export default (sequelize: Sequelize): typeof Post => {
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      categoryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );

  return Post;
};
