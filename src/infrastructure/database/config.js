const config = require('config');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
    database: config.get('db.name'),
    username: config.get('db.username'),
    password: process.env.DB_PASSWORD,
    host: config.get('db.host'),
    port: config.get('db.port'),
    dialect: 'mysql',
    models: [__dirname + '/models']
}

module.exports = dbConfig;
