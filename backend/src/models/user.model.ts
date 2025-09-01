import { CreationOptional, DataTypes, Model } from 'sequelize';
import db from '../config/database.config';
import { v4 } from 'uuid';

export class User extends Model {
  declare id: CreationOptional<string>;

  declare username: string;
  declare password: string;
}

User.init(
  {
    id: {
      type: DataTypes.STRING(38),
      primaryKey: true,
    },
    username: DataTypes.STRING(100),
    password: DataTypes.STRING(200),
  },
  {
    sequelize: db,
    tableName: 'user',
  }
);

User.beforeCreate((event) => {
  event.id = v4();
});
