const dataRespone = require("../utils/respone");
const message = require("../contants/messageRespone");
const userModel = require("../models/userModel");
const schemaValidation = require("../utils/validationSchema");
const utilToken = require("../utils/token");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const errorValidation = schemaValidation.loginValidation.validate(
      req.body
    ).error;
    if (errorValidation) {
      return res
        .status(402)
        .json(dataRespone(message.error.status, null, errorValidation.message));
    }

    const users = await userModel.getUserByEmail(req.body.email);

    if (users.length === 0) {
      return res
        .status(404)
        .json(
          dataRespone(
            message.error.status,
            null,
            message.error.incorrectCredentials
          )
        );
    }

    const user = users[0];

    const matchPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!matchPassword) {
      return res
        .status(500)
        .json(
          dataRespone(
            message.error.status,
            null,
            message.error.incorrectCredentials
          )
        );
    }

    const dataToken = await utilToken.createToken(user.id);
    return res
      .status(200)
      .json(
        dataRespone(message.success.status, dataToken, message.success.login)
      );
  } catch (error) {
    return res
      .status(500)
      .json(dataRespone(message.error.status, null, error.message));
  }
};

const refershAccessToken = async (req, res) => {
  try {
    const errorValidation =
      schemaValidation.refreshAccessTokenValidation.validate(req.body).error;
    if (errorValidation) {
      return res
        .status(402)
        .json(dataRespone(message.error.status, null, errorValidation.message));
    }

    const decoded = jwt.verify(
      req.body.refersh_token,
      process.env.RAILWAY_PUBLIC_REFRESH_TOKEN_SECRET
    );

    const userId = decoded.idUser;
    const dataToken = await utilToken.createToken(userId);

    return res
      .status(200)
      .json(
        dataRespone(
          message.success.status,
          dataToken,
          message.success.refreshToken
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(dataRespone(message.error.status, null, error.message));
  }
};

const register = async (req, res) => {
  try {
    const errorValidation = schemaValidation.addUserValidation.validate(
      req.body
    ).error;
    if (errorValidation) {
      return res
        .status(402)
        .json(dataRespone(message.error.status, null, errorValidation.message));
    }
    const users = await userModel.getUserByEmail(req.body.email);
    if (users.length !== 0) {
      return res
        .status(400)
        .json(
          dataRespone(message.error.status, null, message.error.emailTaken)
        );
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    idNewUser = await userModel.saveUser(req.body);

    return res
      .status(200)
      .json(
        dataRespone(
          message.success.status,
          { id: idNewUser },
          message.success.create
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(dataRespone(message.error.status, null, error.message));
  }
};

module.exports = { login, refershAccessToken, register };
