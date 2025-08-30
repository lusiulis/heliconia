import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  Model,
  NonAttribute,
} from 'sequelize';
import { Bill } from './bill.model';
import { Product } from './product.model';
import { ItemDescription } from './itemdescription.model';
import db from '../config/database.config';
import { v4 } from 'uuid';

export class BillItem extends Model {
  declare id: CreationOptional<string>;
  declare quantity: number;

  declare billId: ForeignKey<Bill['id']>;
  declare productId: ForeignKey<Product['id']>;

  declare descriptions?: NonAttribute<ItemDescription[]>;
}

BillItem.init(
  {
    id: {
      type: DataTypes.STRING(38),
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
  },
  {
    sequelize: db,
    tableName: 'billitem',
  }
);

ItemDescription.belongsTo(BillItem, { foreignKey: 'billItemId' });
BillItem.hasMany(ItemDescription, { foreignKey: 'billItemId' });

Product.belongsToMany(Bill, {
  through: BillItem,
  foreignKey: 'productId',
  otherKey: 'billId',
});

Bill.belongsToMany(Product, {
  through: BillItem,
  foreignKey: 'billId',
  otherKey: 'productId',
});

BillItem.beforeCreate((event) => {
  event.id = v4();
});
