const { TodoRepo } = require('../../../domain/todo/repo/TodoRepo');
const { CreateTodoUseCase } = require('../../../domain/todo/useCase/CreateTodoUseCase');
const { UpdateTodoUseCase } = require('../../../domain/todo/useCase/updateTodoUseCase');

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
            throw new Error('Error creating Todo');
        }
    }

    async update(req) {
        const { id } = req.params;
        const { body } = req;

        try {
            const todo = await this.todoRepo.findById(id);
            const useCase = new UpdateTodoUseCase(body, todo);
            return useCase.run();
        } catch (e) {
            console.log('--->', e)
            throw new Error('Something wrong happening');
        }

    }

}

module.exports = { TodoController };
