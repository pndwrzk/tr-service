const mysql = require("mysql2");

const pool = mysql.createPool({
  driver: "mysql",
  host: "monorail.proxy.rlwy.net",
  user: "root",
  password: "MECvOhMsbEXhauHuSPNJvMThRpUJovVl",
  database: "railway",
  port: 12552,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
console.log(pool);

module.exports = pool.promise();
