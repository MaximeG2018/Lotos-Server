import fs from "fs";
import Sequelize from "sequelize";
import User from "./model/user";
import Video from "./model/video";
// import Guest from "./model/guest";
import Tag from "./model/tag";
import Qcm from "./model/qcm";
import Question from "./model/question";
import Answer from "./model/answer";
import Badge from "./model/badge";

const env = process.env.dev || "dev";
console.log(env);
const config = fs.existsSync(__dirname.replace("\\", "/") + "/config.json")
  ? require("./config.json")[env]
  : null; // dev => Heroku : local => PhpMyAdmin

export const db = config
  ? new Sequelize(config.database, config.user, config.password, {
      dialect: config.dialect,
      host: config.host,
      port: config.port,
      logging: console.log,
      dialectOptions: {
        ssl: config.ssl
      },
      define: {
        timestamps: false
      }
    })
  : new Sequelize(process.env.DATABASE_URL, { logging: false });

db.authenticate().then(
  err => {
    console.log("Connection has been established successfully.");
  },
  err => {
    console.log("Unable to connect to the database:", err);
  }
);
User.init(db);
Video.init(db);
// Guest.init(db);
Tag.init(db);
Qcm.init(db);
Answer.init(db);
Question.init(db);
Badge.init(db);

//rappel Sequelize
// belongsTo 1,1
// belongsToMany N,M
// hasMany  1,N
// hasOne

//Jointure Video to User
Video.belongsTo(User);
//Jointure User to Video
User.hasMany(Video);

//Une question appartient a un seul QCM
Question.belongsTo(Qcm);

// Un QCM a plusieurs questions
Qcm.hasMany(Question);

// Une réponse appartient a une et une seule question
Answer.belongsTo(Question);

//Table de jointure TAG & VIDEO
Video.belongsToMany(Tag, {
  as: "videoToTag",
  through: "videoTag",
  foreignKey: "idVideo"
});
//Video.belongsToMany(Guest, {as: 'videoToGuest', through: 'videoGuest', foreignKey: 'idVideo'});

// Table de jointure  QCM & USER
Qcm.belongsToMany(User, {
  as: "qcmToUser",
  through: "qcmUser",
  foreignKey: "idQcm"
});

User.belongsToMany(Qcm, {
  as: "userToQCM",
  through: "qcmUser",
  foreignKey: "idUser"
});

// Table de jointure  BADGE & USER || Comment on ajoute le champs isTrue ?
Badge.belongsToMany(User, {
  as: "badgeToUser",
  through: "badgeUser",
  foreignKey: "idBadge"
});
User.belongsToMany(Badge, {
  as: "userToBadge",
  through: "badgeUser",
  foreignKey: "idUser"
});
