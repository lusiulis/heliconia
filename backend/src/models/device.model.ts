import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  Model,
  NonAttribute,
} from 'sequelize';
import db from '../config/database.config';
import { v4 } from 'uuid';
import { Kitchen } from './kitchen.model';

export class Device extends Model {
  declare id: CreationOptional<string>;
  declare secret: string;
  declare name: string;
  declare role: DeviceRole;
  declare deleted: boolean;

  declare kitchenId: ForeignKey<Kitchen['id']>;
  declare kitchen?: NonAttribute<Kitchen>;
}

Device.init(
  {
    id: {
      type: DataTypes.STRING(38),
      primaryKey: true,
    },
    secret: DataTypes.STRING(200),
    name: DataTypes.STRING(100),
    role: DataTypes.ENUM('KITCHEN', 'CHECKOUT', 'WAITER'),
    deleted: DataTypes.BOOLEAN,
  },
  { sequelize: db, tableName: 'device' }
);

Device.beforeCreate((event) => {
  event.id = v4();
});
