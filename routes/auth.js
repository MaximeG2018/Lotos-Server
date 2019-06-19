import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../database/model/user";
import passport from "passport";

const api = Router();

api.post("/register", async (req, res) => {
  const { firstname, lastname, email, password, password_confirmation } = req.body;
  try {
    const user = new User({
      firstname,
      lastname,
      email,
      password,
      password_confirmation
    });
    await user.save();
    const payload = { id: user.id, firstname, lastname, email };
    const token = jwt.sign(payload, process.env.SUPERSECRET);

    res.status(201).json({ data: { user }, meta: { token } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

api.post("/login", async (req, res) => {
  passport.authenticate("local", { session: false }, async (err, user) => {
    if (err) {
      res.status(400).json({
        error: { message: err }
      });
      return res.status(400);
    }

    const { id, firstname, email } = user;
    const payload = { id, firstname, email };
    const token = jwt.sign(payload, process.env.SUPERSECRET);
    res.status(200).json({ data: { user }, meta: { token } });
  })(req, res);
});

export default api;
