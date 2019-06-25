import express from "express";
import app from './app';
import pg from 'pg';
import { db } from './database/initdb';
import "./middleware/passport";

const port = process.env.PORT || 8080 ;

if (process.env.NODE_ENV) {
  db.sync({ force: true }); // true: drops all tables first
} else {
  throw new Error('CONFIG ERROR : Please specify your NODE_ENV in an env file')
}

app.listen(port, () => console.log(`Server running on port ${port}`));
