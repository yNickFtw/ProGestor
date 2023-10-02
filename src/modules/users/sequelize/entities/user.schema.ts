import { DataTypes } from "sequelize";
import database from "../../../../db/config";

const User = database.define("users", {
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
  surname: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  profileImage: {
    type: DataTypes.STRING(),
    allowNull: true
  },
  profileImageFilename: {
    type: DataTypes.STRING(),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  isPremium: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export { User };
