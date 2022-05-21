const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { jwtSecret } = require('./config');

async function validateUser(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().trim().min(5).max(10).required(),
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json(error.details);
  }
}

async function validateToken(req, res, next) {
  const tokenFromHeaders = req.headers.authorization?.split(' ')[1];

  if (!tokenFromHeaders) {
    res.status(401).json({
      success: false,
      error: 'No valid token',
    });
    return;
  }

  try {
    const tokenPayload = jwt.verify(tokenFromHeaders, jwtSecret);
    const userId = tokenPayload.userId;
    req.userId = userId;
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      error: 'Invalid token',
    });
  }
}

module.exports = {
  validateUser,
  validateToken,
};
