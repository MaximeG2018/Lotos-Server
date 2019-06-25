import Sequelize, { Model } from "sequelize";

export default class Trophee extends Model {
  static init(database) {

    return super.init(
      {
        idTrophee: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING
        }
      }, {
        tableName: "trophee",
        sequelize: database,
      })
  };
}
