const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('./config');
const mysql = require('mysql2/promise');
const Todo = require('./models/Todo');

const db = {};

async function initialize() {
    try {
        const { host, port, username, password, database } = dbConfig;
        const connection = await mysql.createConnection({ host, port, user: username, password });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

        const sequelize = new Sequelize(dbConfig);
        console.log('Connection has been established successfully');

        db.Sequelize = Sequelize;
        db.sequelize = sequelize;

        db.Todo = Todo(sequelize, DataTypes);

        sequelize.sync();
    } catch (error) {
        console.error('Unable to connect to Database: ', error);
    }
};

initialize();

module.exports = db;
