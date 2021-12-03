const Joi = require("joi");

module.exports = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().max(255).required(),
  password: Joi.string().min(5).required(),
  avatar: Joi.string(),
});
