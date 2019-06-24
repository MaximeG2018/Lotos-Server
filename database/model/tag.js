import Sequelize, { Model } from "sequelize";

export default class Tag extends Model {
  static init(database) {

    return super.init(
      {
        idTag: {
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING
        }
      }, {
        tableName: "tag",
        sequelize: database,
      })
  };
}
