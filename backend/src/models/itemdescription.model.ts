import { CreationOptional, DataTypes, ForeignKey, Model } from 'sequelize';
import { BillItem } from './billitem.model';
import db from '../config/database.config';
import { v4 } from 'uuid';

export class ItemDescription extends Model {
  declare id: CreationOptional<String>;
  declare description: string;

  declare billItemId: ForeignKey<BillItem['id']>;
}

ItemDescription.init(
  {
    id: {
      type: DataTypes.STRING(38),
      primaryKey: true,
    },
    description: DataTypes.STRING(200),
  },
  { sequelize: db, tableName: 'itemdescription' }
);

ItemDescription.beforeCreate((event) => {
  event.id = v4();
});
