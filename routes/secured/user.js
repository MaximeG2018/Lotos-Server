import { Router } from "express";
import User from "../../database/model/user";
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';

const api = Router();

api.get("/", async (req, res) => {
  const users = await User.findAll();
  res.status(200).json({ data: { users } });
});

api.get('/:id', async (req,res)=> {
  const user = await User.findByPk(req.params.id);
  res.status(200).json(user);
})

export default api;
