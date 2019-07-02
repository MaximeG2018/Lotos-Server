import Sequelize, { Model } from "sequelize";

export default class Badge extends Model {
  static init(database) {
    return super.init(
      {
        idBadge: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING
        },
        image: {
          type: Sequelize.STRING
        },
        requiredPoints: {
          type: Sequelize.INTEGER
        }
      },
      {
        tableName: "badge",
        sequelize: database
      }
    );
  }
}
