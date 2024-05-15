const db = require("../config/db");

const getUserByEmail = async (email) => {
  try {
    const [rows] = await db.execute("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const saveUser = async (bodyRequest) => {
  try {
    const [result] = await db.execute(
      "INSERT INTO user (email, password, name ) VALUES (?, ?, ?)",
      [bodyRequest.email, bodyRequest.password, bodyRequest.name]
    );
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  saveUser,
  getUserByEmail,
};
