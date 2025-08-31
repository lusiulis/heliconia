import { CreationOptional, DataTypes, Model } from 'sequelize';
import db from '../config/database.config';
import { v4 } from 'uuid';

export class Device extends Model {
  declare id: CreationOptional<string>;
  declare secret: string;
  declare name: string;
  declare role: DeviceRole;
  declare deleted: boolean;
}

Device.init(
  {
    id: {
      type: DataTypes.STRING(38),
      primaryKey: true,
    },
    secret: DataTypes.STRING(200),
    name: DataTypes.STRING(100),
    role: DataTypes.ENUM('ADMIN', 'KITCHEN', 'CHECKOUT', 'WAITER'),
    deleted: DataTypes.BOOLEAN,
  },
  { sequelize: db, tableName: 'device' }
);

Device.beforeCreate((event) => {
  event.id = v4();
});
