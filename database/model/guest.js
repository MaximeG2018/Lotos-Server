import Sequelize, { Model } from "sequelize";

export default class Guest extends Model {
  static init(database) {

    return super.init(
      {
        idGuest: {
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING
        }
      }, {
        tableName: "guest",
        sequelize: database,
      })
  };
}
