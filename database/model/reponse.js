import Sequelize, { Model } from "sequelize";

export default class Reponse extends Model {
  static init(database) {

    return super.init(
      {
        idReponse: {
          type: Sequelize.INTEGER,
        },
        reponse: {
          type: Sequelize.STRING,
        }
      }, {
        tableName: "reponse",
        sequelize: database,
      })
  };
}
