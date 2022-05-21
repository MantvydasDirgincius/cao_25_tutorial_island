const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerUser, loginUser } = require('../model/userModel');
const userRoutes = express.Router();

userRoutes.post('/registration', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
    };
    await registerUser(newUser.email, newUser.password);
    res.status(201).json({ success: true, message: 'User registration successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});
userRoutes.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [loginResult] = await loginUser(email);
    if (!loginResult) {
      res.status(500).json({ success: false, message: 'email or password incorrect(email)' });
      return;
    }
    if (!bcrypt.compareSync(password, loginResult.password)) {
      res.status(500).json({ success: false, message: 'email or password incorrect(pass)' });
      return;
    }

    res.json({ success: true, msg: 'login success' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'something went wrong' });
  }
});

module.exports = userRoutes;
