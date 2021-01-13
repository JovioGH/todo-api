const { ModelNotFoundException } = require('../../../exceptions/ModelNotFoundException');
const { Todo } = require('../../../infrastructure/database/models/Todo');

class TodoRepo {
    constructor() {
        this.scopes = [];
        this.requestParams = {}
    }

    async getAll() {
        return await Todo.findAll();
    }

    async findOrFail(id) {
        try {
            const todo = await Todo.scope().findByPk(id, { rejectOnEmpty: true });
            return todo;
        } catch (error) {
            throw new ModelNotFoundException(`Todo with id ${id} not found`)
        }
    }
}

module.exports = { TodoRepo }

