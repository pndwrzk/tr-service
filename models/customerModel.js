const db = require("../config/db");

const getAllCustomer = async (pagging) => {
  try {
    const [rows] = await db.execute(
      `SELECT * FROM customer ORDER BY ${pagging.orderByClause} LIMIT ${pagging.pageSize} OFFSET ${pagging.offset}`
    );

    return rows;
  } catch (error) {
    throw error;
  }
};

const getCustomerByEmail = async (email) => {
  try {
    const [rows] = await db.execute("SELECT * FROM customer WHERE email = ?", [
      email,
    ]);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getCustomerById = async (id) => {
  try {
    const [rows] = await db.execute("SELECT * FROM customer WHERE id = ?", [
      id,
    ]);
    return rows;
  } catch (error) {
    throw error;
  }
};

const saveCustomer = async (bodyRequest) => {
  try {
    const [result] = await db.execute(
      "INSERT INTO customer (identity_card, full_name, email,phone_number,gender ) VALUES (?, ?, ?, ?, ?)",
      [
        bodyRequest.identity_card,
        bodyRequest.full_name,
        bodyRequest.email,
        bodyRequest.phone_number,
        bodyRequest.gender,
      ]
    );
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

const updateCustomerById = async (id, bodyRequest) => {
  try {
    const [result] = await db.execute(
      "UPDATE customer SET identity_card = ?, full_name = ?, email = ?, phone_number = ?, gender = ? WHERE id = ?",
      [
        bodyRequest.identity_card,
        bodyRequest.full_name,
        bodyRequest.email,
        bodyRequest.phone_number,
        bodyRequest.gender,
        id,
      ]
    );
    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    const [result] = await db.execute("DELETE FROM customer WHERE id = ?", [
      id,
    ]);
    console;
    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};

const deleteBulkById = async (idArray) => {
  try {
    const [result] = await db.execute(
      `DELETE FROM customer WHERE id IN (${idArray.toString()})`
    );

    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllCustomer,
  getCustomerByEmail,
  getCustomerById,
  saveCustomer,
  updateCustomerById,
  deleteById,
  deleteBulkById,
};
