import { CreationOptional, DataTypes, Model, NonAttribute } from 'sequelize';
import { Category } from './category.model';
import db from '../config/database.config';
import { v4 } from 'uuid';

export class Section extends Model {
  declare id: CreationOptional<string>;

  declare name: string;
  declare color: string;

  declare categories?: NonAttribute<Category[]>;
}

Section.init(
  {
    id: {
      type: DataTypes.STRING(38),
      primaryKey: true,
    },
    name: DataTypes.STRING(100),
    color: DataTypes.STRING(100),
  },
  {
    sequelize: db,
    tableName: 'section',
  }
);

Category.belongsTo(Section, { foreignKey: 'sectionId' });
Section.hasMany(Category, { foreignKey: 'sectionId' });

Section.beforeCreate((event) => {
  event.id = v4();
});
