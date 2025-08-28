import { DataTypes, ForeignKey, Model } from 'sequelize';
import { Product } from './product.model';
import { Category } from './category.model';
import db from '../config/database.config';

export class CategoryXProduct extends Model {
  declare productId: ForeignKey<Product['id']>;
  declare categoryId: ForeignKey<Category['id']>;
}

CategoryXProduct.init(
  {
    productId: {
      type: DataTypes.STRING(38),
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.STRING(38),
      primaryKey: true,
    },
  },
  {
    sequelize: db,
    tableName: 'categoryxproduct',
  }
);

Product.belongsToMany(Category, {
  through: CategoryXProduct,
  foreignKey: "productId",
  otherKey: "categoryId",
});

Category.belongsToMany(Product, {
  through: CategoryXProduct,
  foreignKey: "categoryId",
  otherKey: "productId",
});