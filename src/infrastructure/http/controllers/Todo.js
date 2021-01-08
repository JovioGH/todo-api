const { TodoRepo } = require('../../../domain/todo/repo/TodoRepo');
const { CreateTodoUseCase } = require('../../../domain/todo/useCase/CreateTodoUseCase');

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

    async create(req) {
        const { body } = req;
        try {
            const useCase = new CreateTodoUseCase(body);
            return useCase.run();
        } catch (error) {
            console.log('error here --->', error)
        }
    }
}

module.exports = { TodoController };
