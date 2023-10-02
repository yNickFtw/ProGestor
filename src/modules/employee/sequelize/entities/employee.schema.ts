import { DataTypes } from "sequelize";
import database from '../../../../db/config';

const Employee = database.define('employee', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  canCreateProject: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  canUpdateProject: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  canDeleteProject: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export { Employee };
