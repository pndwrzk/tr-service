const joi = require("joi");

const loginValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const addUserValidation = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const refreshAccessTokenValidation = joi.object({
  refersh_token: joi.string().required(),
});

const addCustomerValidation = joi.object({
  identity_card: joi.string().required(),
  full_name: joi.string().required(),
  email: joi.string().email().required(),
  phone_number: joi.string().required(),
  gender: joi.string().required(),
});

module.exports = {
  loginValidation,
  addUserValidation,
  refreshAccessTokenValidation,
  addCustomerValidation,
};
