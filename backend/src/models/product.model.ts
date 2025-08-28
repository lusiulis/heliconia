import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  Model,
  NonAttribute,
} from 'sequelize';
import db from '../config/database.config';
import { Kitchen } from './kitchen.model';
import { Category } from './category.model';
import { Option } from './option.model';
import { v4 } from 'uuid';

export class Product extends Model {
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: string;
  declare price: number;
  declare img: string;
  declare has_options: boolean;

  declare kitchenId: ForeignKey<Kitchen['id']>;
  declare kitchen?: NonAttribute<Kitchen>;

  declare categories?: NonAttribute<Category[]>;
  declare options?: NonAttribute<Option[]>;
}

Product.init(
  {
    id: {
      type: DataTypes.STRING(38),
      primaryKey: true,
    },
    name: DataTypes.STRING(100),
    description: DataTypes.STRING(500),
    price: DataTypes.INTEGER,
    img: DataTypes.STRING(200),
    has_options: DataTypes.BOOLEAN,
  },
  { sequelize: db, tableName: 'product' }
);

Option.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Option, { foreignKey: 'productId' });

Product.beforeCreate((event) => {
  event.id = v4();
});
