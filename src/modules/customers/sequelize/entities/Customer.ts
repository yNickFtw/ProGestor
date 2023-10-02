import { DataTypes } from "sequelize";
import database from '../../../../db/config'

const Customer = database.define('customer', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  profilePicture: {
    type: DataTypes.TEXT("long"),
    defaultValue: ""
  },
  phone: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  note: {
    type: DataTypes.TEXT(),
    allowNull: true,
  }
});

export { Customer }
