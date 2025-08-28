import { CreationOptional, DataTypes, ForeignKey, Model } from 'sequelize';
import { Product } from './product.model';
import db from '../config/database.config';
import { v4 } from 'uuid';

export class Option extends Model {
  declare id: CreationOptional<string>;
  declare name: string;

  declare productId: ForeignKey<Product['id']>;
}

Option.init(
  {
    id: {
      type: DataTypes.STRING(38),
      primaryKey: true,
    },
    name: DataTypes.STRING(100),
  },
  {
    sequelize: db,
    tableName: 'options',
  }
);

Option.beforeCreate((event) => {
  event.id = v4();
})
