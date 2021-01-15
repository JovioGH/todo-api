const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
const dbConfig = require('./config');
const sequelize = new Sequelize(dbConfig);

// Import required models
const { Todo } = require('./models/Todo');
const { Subtask } = require('./models/Subtask');

// Initialize models
const models = {
    Todo: Todo.init(sequelize, Sequelize),
    Subtask: Subtask.init(sequelize, Sequelize)
};

const db = {
    ...models,
    sequelize
};

async function connect() {
    try {
        const { host, port, username, password, database } = dbConfig;
        const connection = await mysql.createConnection({ host, port, user: username, password });
        const databaseInstance = await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

        console.log('Database created successfully, connection created', databaseInstance);
        await sequelize.sync();
    } catch (error) {
        console.error('Unable to create Database:', error);
    }
};

async function associate() {
    models.Subtask.belongsTo(Todo, {
        foreignKey: {
            allowNull: false
        }
    });

    models.Todo.hasMany(Subtask, {
        onDelete: 'CASCADE'
    });
}

associate();
connect();

module.exports = db;
