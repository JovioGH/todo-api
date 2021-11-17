const Sequelize = require("sequelize");

class Subtask extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        status: {
          allowNull: false,
          type: DataTypes.STRING,
          defaultValue: "pending",
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
        deletedAt: {
          allowNull: true,
          type: DataTypes.DATE,
        },
      },
      {
        sequelize: sequelize,
        underscored: true,
        paranoid: true,
        modelName: "subtask",
        scopes: {
          byTodo(id) {
            return {
              where: {
                todo_id: id,
              },
            };
          },
          byStatus(status) {
            return {
              where: {
                status: status,
              },
            };
          },
        },
      }
    );
  }
}

module.exports = { Subtask };
