import { DataTypes } from "sequelize";
import database from "../../../../db/config";

const Invite = database.define('invite', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING(),
    defaultValue: "waiting",
    allowNull: false,
  },
  expirationDay: {
    type: DataTypes.DATE,
  }
});

export { Invite };

/*
-----------------
 * 1 - rejected |
 * 2 - accepted |
 * 3 - waiting  |
-----------------
*/
