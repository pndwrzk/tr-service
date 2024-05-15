"use strict";

const dbm = global.dbm || require("db-migrate");
const type = dbm.dataType;

exports.up = function (db, callback) {
  db.createTable(
    "customer",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      identity_card: { type: "string", length: 16, notNull: true },
      full_name: { type: "string", length: 255, notNull: true },
      email: { type: "string", length: 100, notNull: true },
      phone_number: { type: "string", length: 20, notNull: true },
      gender: {
        type: "string",
        length: 10,
        notNull: true,
        check: {
          in: ["pria", "wanita"],
        },
      },
    },
    callback
  );
};

exports.down = function (db, callback) {
  db.dropTable("customer", callback);
};
