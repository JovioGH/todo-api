const { TodoRepo } = require('../../../domain/todo/repo/TodoRepo');

class TodoController {
    constructor() {
        this.todoRepo = new TodoRepo();
    }

    async fetchAll(req) {
        try {
            const { query } = req;
            const todos = await this.todoRepo.getAll();
            return todos;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = { TodoController };
