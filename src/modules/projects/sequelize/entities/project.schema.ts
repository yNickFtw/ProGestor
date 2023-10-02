import { DataTypes } from "sequelize";
import database from "../../../../db/config";

const Project = database.define("projects", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
});

export { Project };
