import fs from 'fs';
import Sequelize from "sequelize";
import User from "./model/user";

const config = fs.existsSync(__dirname.replace('\\','/')+'/config.json') ? require('./config.json').dev : null;

export const db = (config) ? new Sequelize(
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
