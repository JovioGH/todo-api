const { Sequelize } = require('sequelize');
const dbConfig = require('./config');
const mysql = require('mysql2/promise');

const db = {};

initialize();

// Testing Database connection
async function initialize() {
    try {
        const { host, port, username, password, database } = dbConfig;
        const connection = await mysql.createConnection({ host, port, user: username, password });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

        const sequelize = new Sequelize(dbConfig);

        await sequelize.authenticate();
        console.log('Connection has been established successfully');
    } catch (error) {
        console.error('Unable to connect to Database: ', error);
    }
};

module.exports = db;
