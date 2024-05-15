const jwt = require("jsonwebtoken");
const createToken = async (idUser) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const tokenExpiresIn = 3600;
  const refreshAccessTokenExpiresIn = 3000;
  const accessToken = await jwt.sign(
    { idUser },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: tokenExpiresIn,
    }
  );

  const refreshAccessToken = await jwt.sign(
    { idUser },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: refreshAccessTokenExpiresIn,
    }
  );

  const resultData = {
    access_token: accessToken,
    refresh_access_token: refreshAccessToken,
    access_token_expired: currentTimestamp + tokenExpiresIn,
    refresh_access_token_expired:
      currentTimestamp + refreshAccessTokenExpiresIn,
  };

  return resultData;
};

module.exports = {
  createToken,
};
