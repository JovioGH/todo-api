const config = require("config");
const dotenv = require("dotenv");

dotenv.config();

const dbConfig = {
  database: config.get("db.name"),
  username: config.get("db.username"),
  password: config.get("db.password"),
  host: config.get("db.host"),
  port: config.get("db.port"),
  dialect: "postgres",
  define: {
    freezeTableName: true,
  },
};

module.exports = dbConfig;
