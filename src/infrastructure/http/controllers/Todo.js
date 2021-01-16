const { TodoRepo } = require('../../../domain/todo/repo/TodoRepo');
const { CreateTodoUseCase } = require('../../../domain/todo/useCase/CreateTodoUseCase');
const { DeleteTodoUseCase } = require('../../../domain/todo/useCase/deleteTodoUseCase');
const { UpdateTodoUseCase } = require('../../../domain/todo/useCase/updateTodoUseCase');
const { HttpException } = require('../../../exceptions/HttpException');

class TodoController {
    constructor() {
        this.todoRepo = new TodoRepo();
    }

    async fetchAll(req) {
        try {
            const { query: queryParams } = req;
            const todos = await this.todoRepo.applyFilters(queryParams).getAll();
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
            const todo = await this.todoRepo.findOrFail(Number(id));
            const useCase = new UpdateTodoUseCase(body, todo);
            return useCase.run();
        } catch (error) {
            throw new HttpException(error.status, error.message || error.name)
        }
    }

    async delete(req) {
        const { id } = req.params;

        try {
            const todo = await this.todoRepo.findOrFail(Number(id));
            const useCase = new DeleteTodoUseCase(todo);
            return useCase.run();
        } catch (error) {
            throw new HttpException(error.status, error.message || error.name);
        }
    }
}

module.exports = { TodoController };
