import { CreationOptional, DataTypes, ForeignKey, Model } from 'sequelize';
import { Order } from './order.model';
import db from '../config/database.config';

export class Bill extends Model {
  declare id: CreationOptional<string>;
  declare total: number;

  declare orderId: ForeignKey<Order['id']>;
}

Bill.init(
  {
    id: {
      type: DataTypes.STRING(38),
      primaryKey: true,
    },
    total: DataTypes.INTEGER,
  },
  {
    sequelize: db,
    tableName: 'bill',
  }
);
