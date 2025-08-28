import { CreationOptional, DataTypes, Model, NonAttribute } from 'sequelize';
import db from '../config/database.config';
import { Product } from './product.model';
import { v4 } from 'uuid';

export class Category extends Model {
  declare id: CreationOptional<string>;
  declare name: string;

  declare products?: NonAttribute<Product[]>
}

Category.init(
  {
    name: DataTypes.STRING(100),
    id: {
      type: DataTypes.STRING(38),
      primaryKey: true,
    },
  },
  {
    sequelize: db,
    tableName: 'category',
  }
);

Category.beforeCreate((event) => {
  event.id = v4();
})
