const Sequelize = require('sequelize');

class Todo extends Sequelize.Model {
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

module.exports = { Todo }
