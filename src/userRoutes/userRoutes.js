const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerUser } = require('../model/userModel');

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
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
});

module.exports = userRoutes;
