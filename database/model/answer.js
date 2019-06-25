import Sequelize, { Model } from "sequelize";

export default class Answer extends Model {
  static init(database) {

    return super.init(
      {
        idAnswer: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false
        },
        reponse: {
          type: Sequelize.STRING,
        }
      }, {
        tableName: "answer",
        sequelize: database,
      })
  };
}
