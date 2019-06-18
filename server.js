import express from "express";
import app from './app';
import mysql from 'mysql2';
import { db } from './database/initdb';
import "./middleware/passport";

const port = process.env.PORT;

if (process.env.NODE_ENV) {
  db.sync({ force: false }); // true: drops all tables first
} else {
  throw new Error('CONFIG ERROR : Please specify your NODE_ENV in an env file')
}

app.listen(port, () => console.log(`Server running on port ${port}`));
