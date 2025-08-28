import { CreationOptional, DataTypes, Model, NonAttribute } from 'sequelize';
import db from '../config/database.config';
import { v4 } from 'uuid';
import { Bill } from './bill.model';

export class Order extends Model {
  declare id: CreationOptional<string>;
  declare table: number;
  declare waiter: string;

  declare bills?: NonAttribute<Bill[]>;
}

Order.init(
  {
    id: {
      type: DataTypes.STRING(38),
      primaryKey: true,
    },
    table: DataTypes.INTEGER({ length: 2 }),
    waiter: DataTypes.STRING(100),
  },
  {
    sequelize: db,
    tableName: 'order',
  }
);

Bill.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasMany(Bill, { foreignKey: 'orderId' });

Order.beforeCreate((event) => {
  event.id = v4();
});
