import fs from 'fs';
import Sequelize from "sequelize";
import User from "./model/user";
import Video from "./model/video";
import Guest from './model/guest';
import Tag from './model/tag';
import Qcm from './model/qcm'
import  Question from  './model/question'
import  Reponse from  './model/reponse'
import  Trophee from './model/trophee'


const config = fs.existsSync(__dirname.replace('\\','/')+'/config.json') ? require('./config.json').local : null;     // dev => Heroku : local => PhpMyAdmin

export const db = (config) ? new Sequelize (
  config.database,
  config.user,
  config.password,
  {
    dialect: config.dialect,
    host: config.host,
    port: config.port,
    logging: console.log,
    define: {
      timestamps: false
    }
  }) : new Sequelize(process.env.JAWSDB_URL, {logging: false} );

db.authenticate().then( (err)=> {
		console.log('Connection has been established successfully.');
	}, (err)=> {
		console.log('Unable to connect to the database:', err);
	}
);

User.init(db);
Video.init(db);
Guest.init(db);
Tag.init(db);
Qcm.init(db);
Reponse.init(db);
Question.init(db);
Trophee.init(db);

//
Video.belongsTo(User);
User.hasMany(Video);

//
Video.belongsToMany(Tag, {as: 'videoToTag', through: 'videoTag', foreignKey: 'idVideo'});
Video.belongsToMany(Guest, {as: 'videoToGuest', through: 'videoGuest', foreignKey: 'idVideo'});
