import Sequelize, { Model } from "sequelize";

export default class Qcm extends Model {
  static init(database) {

    return super.init(
      {
        idQcm: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING
        }
      }, {
        tableName: "qcm",
        sequelize: database,
      })
  };
}
