const express = require('express');
const { validateToken } = require('../middleware');
const { createTutorial, getTutorials } = require('../model/tutorialModel');

const tutorialRoutes = express.Router();

tutorialRoutes.post('/create-tutorial', validateToken, async (req, res) => {
  try {
    const { user_id, title, content, private } = req.body;
    await createTutorial(user_id, title, content, private);
    res.status(201).json({ success: true, message: 'Tutorial was create successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});
tutorialRoutes.get('/public-tutorial', async (req, res) => {
  try {
    const tutorials = await getTutorials('notoken');
    res.status(200).json({ success: true, tutorials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'something went wrong' });
  }
});
tutorialRoutes.get('/all-tutorial', validateToken, async (req, res) => {
  try {
    const tutorials = await getTutorials();
    res.status(200).json({ success: true, tutorials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'something went wrong' });
  }
});

module.exports = tutorialRoutes;
