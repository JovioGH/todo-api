const db = require('../../../infrastructure/database/manager');
const { Todo } = require('../../../infrastructure/database/models/Todo');

class TodoRepo {
    constructor() {
        this.scopes = [];
        this.requestParams = {}
    }

    async getAll() {
        const results = await db.Todo.findAll();
        return results;
    }

    async findById(id) {
        try {
            const todo = await Todo.findByPk(id);
            return todo;
        } catch (error) {
            throw new Error(`Todo with id ${id} not found`)
        }
    }
}

module.exports = { TodoRepo }

