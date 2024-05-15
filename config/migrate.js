require("dotenv").config();
const DbMigrate = require("db-migrate");
const dbmigrate = DbMigrate.getInstance(true, {
  config: {
    dev: {
      driver: "mysql",
      host: process.env.RAILWAY_PUBLIC_DB_HOST,
      user: process.env.RAILWAY_PUBLIC_DB_USERNAME,
      password: process.env.RAILWAY_PUBLIC_DB_PASSWORD,
      database: process.env.RAILWAY_PUBLIC_DB_NAME,
    },
  },
});

const action = process.argv[2] || "up"; // default action is 'up'

dbmigrate[action]()
  .then(() => {
    console.log("Migration completed.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
  });
