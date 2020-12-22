'use strict'

const { DataTypes } = require('sequelize/types')

module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('todo', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        status: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: 'pending'
        }
    })
}
