const bcrypt = require("bcryptjs");
const bcryptPassword = (plainTextPassword) => {
  const password = bcrypt.hash(plainTextPassword, 10, (err, hash) => {
    if (err) {
      throw err;
    }
    return hash;
  });
  return password;
};

const comparePassword = (plainTextPassword, hashedPasswordFromDatabase) => {
  bcrypt.compare(
    plainTextPassword,
    hashedPasswordFromDatabase,
    (err, result) => {
      if (err) {
        throw err;
      }

      return result ? true : false;
    }
  );
};

module.exports = {
  bcryptPassword,
  comparePassword,
};
