import express from 'express';
import fs from 'fs';
import marked from 'marked';
import bodyParser from 'body-parser';
import passport from "passport";
import api from './routes/';

require('dotenv').config();
const app = express();

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.get("/", (request, response) => {
  const file = fs.readFileSync("./README.md", 'utf8');
  response.send(marked(file.toString()));
});

app.use("/api", api);

export default app;
