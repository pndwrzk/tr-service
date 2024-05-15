"use strict";

const dbm = global.dbm || require("db-migrate");
const type = dbm.dataType;
const seed = global.seed || require("db-migrate").seed;

exports.up = function (db, callback) {
  db.createTable(
    "user",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      name: { type: "string", length: 100, notNull: true },
      password: { type: "string", length: 255, notNull: true },
      email: { type: "string", length: 100, notNull: true, unique: true },
    },
    callback
  );
};

exports.down = function (db, callback) {
  db.dropTable("user", callback);
};
