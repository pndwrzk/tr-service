const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.RAILWAY_PUBLIC_DB_HOST,
  user: process.env.RAILWAY_PUBLIC_DB_USERNAME,
  password: process.env.RAILWAY_PUBLIC_DB_PASSWORD,
  database: process.env.RAILWAY_PUBLIC_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
