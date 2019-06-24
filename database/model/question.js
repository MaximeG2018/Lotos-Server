import Sequelize, { Model } from "sequelize";

export default class Question extends Model {
  static init(database) {

    return super.init(
      {
        idQuestion: {
          type: Sequelize.INTEGER,
        },
        question: {
          type: Sequelize.STRING,
        }
      }, {
        tableName: "question",
        sequelize: database,
      })
  };
}
