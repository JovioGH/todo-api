const Sequelize = require('sequelize');
const { Todo } = require('./Todo');

class Subtask extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
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
            },
            createdAt: {
                type: DataTypes.DATE
            },
            updatedAt: {
                type: DataTypes.DATE
            },
            deletedAt: {
                allowNull: true,
                type: DataTypes.DATE
            }
        }, {
            sequelize: sequelize,
            underscored: true,
            paranoid: true
        })
    }
}


Subtask.belongsTo(Todo, {
    foreignKey: {
        allowNull: false,
        name: 'todoId'
    }
});

Todo.hasMany(Subtask, {
    onDelete: 'CASCADE'
});

module.exports = { Subtask };
