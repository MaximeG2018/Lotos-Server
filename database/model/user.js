import Sequelize, { Model } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class User extends Model {
  static init(database) {
    return super.init(
      {
        firstname: {
          type: Sequelize.STRING
        },
        lastname: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isEmail: { msg: "Email is not valid." }
          },
          points: {
            type: Sequelize.INTEGER
          },
          unique: {
            args: true,
            msg: "Email already in use"
          }
        },
        password_digest: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        password: {
          type: Sequelize.VIRTUAL,
          validate: {
            isLongEnough(v) {
              if (v.length < 7) {
                throw new Error("Password must have at least 7 characters");
              }
            }
          }
        },
        password_confirmation: {
          type: Sequelize.VIRTUAL,
          validate: {
            isEqual(v) {
              if (v !== this.password) {
                throw new Error("Password confirmation doesn't match password");
              }
            }
          }
        },
        createdAt: {
          type: Sequelize.DATE(3),
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)")
        },
        updatedAt: {
          type: Sequelize.DATE(3),
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)")
        }
      },
      {
        tableName: "user",
        sequelize: database,
        underscored: true,
        indexes: [
          {
            unique: true,
            fields: ["email"]
          }
        ],

        hooks: {
          async beforeValidate(userInstance) {
            if (userInstance.isNewRecord) {
              userInstance.password_digest = await userInstance.generateHash();
            }
          },

          async beforeSave(userInstance) {
            if (!userInstance.isNewRecord && userInstance.changed("password")) {
              userInstance.password_digest = await userInstance.generateHash();
            }
          },
          async beforeUpdate(userInstance) {
            if (userInstance.password && userInstance.changed("password")) {
              userInstance.password_digest = await userInstance.generateHash();
            }
          }
        }
      }
    );
  }

  async generateHash() {
    const SALT_ROUND = 5;
    const hash = await bcrypt.hash(this.password, SALT_ROUND);
    if (!hash) {
      throw new Error("Can't hash password");
    }
    return hash;
  }

  async checkPassword(password) {
    return bcrypt.compare(password, this.password_digest);
  }

  toJSON() {
    const values = Object.assign({}, this.get());

    delete values.password_digest;
    delete values.password;
    delete values.password_confirmation;
    return values;
  }
}
