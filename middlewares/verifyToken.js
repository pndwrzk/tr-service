const jwt = require("jsonwebtoken");
const dataRespone = require("../utils/respone");
const message = require("../contants/messageRespone");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res
      .status(500)
      .json(
        dataRespone(message.error.status, null, message.error.unauthorized)
      );
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err)
      res
        .status(401)
        .json(dataRespone(message.error.status, null, message.error.forbidden));

    next();
  });
};

module.exports = verifyToken;
