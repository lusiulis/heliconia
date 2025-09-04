import { CreationOptional, DataTypes, Model, NonAttribute } from 'sequelize';
import db from '../config/database.config';
import { Product } from './product.model';
import { v4 } from 'uuid';
import { Device } from './device.model';

export class Kitchen extends Model {
  declare id: CreationOptional<string>;
  declare name: string;

  declare products?: NonAttribute<Product[]>;
}

Kitchen.init(
  {
    id: {
      type: DataTypes.STRING(38),
      primaryKey: true,
    },
    name: DataTypes.STRING(100),
  },
  {
    sequelize: db,
    tableName: 'kitchen',
  }
);

Product.belongsTo(Kitchen, { foreignKey: 'kitchenId' });
Kitchen.hasMany(Product, { foreignKey: 'kitchenId' });

Device.belongsTo(Kitchen, { foreignKey: 'kitchenId' });
Kitchen.hasMany(Device, { foreignKey: 'kitchenId' });

Kitchen.beforeCreate((event) => {
  event.id = v4();
});
