import Sequelize, { Model } from "sequelize";

export default class Video extends Model {
  static init(database) {
    return super.init(
      {
        idVideo: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false
        },
        url: {
          type: Sequelize.STRING
        },
        title: {
          type: Sequelize.STRING
        },
        guest: {
          type: Sequelize.JSON
        }
      },
      {
        tableName: "video",
        sequelize: database,
        underscored: true
      }
    );
  }
}
