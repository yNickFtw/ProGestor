import { DataTypes } from "sequelize";
import database from "../../../../db/config";

const Company = database.define("company", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  brandImage: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  brandImageFilename: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT(),
    allowNull: true,
  },
  instagram: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  facebook: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  tiktok: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  whatsapp: {
    type: DataTypes.STRING(),
    allowNull: true,
  }
});

export { Company };
