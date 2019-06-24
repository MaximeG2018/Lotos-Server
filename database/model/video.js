import Sequelize, { Model } from "sequelize";

export default class Video extends Model {
  static init(database) {

    return super.init(
      {
        idVideo: {
          type: Sequelize.INTEGER,
        },
        url: {
          type: Sequelize.STRING,
        },
        title: {
          type: Sequelize.STRING,
        }
      }, {
        tableName: "video",
        sequelize: database,
        underscored: true
      })
  };
}
