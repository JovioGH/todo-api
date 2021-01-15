const { SubtaskRepo } = require('../../../domain/subtask/repo/SubtaskRepo');
const { CreateSubtaskUseCase } = require('../../../domain/subtask/useCases/createSubtaskUseCase');
const { TodoRepo } = require('../../../domain/todo/repo/TodoRepo');

class SubtaskController {
    constructor() {
        this.subtaskRepo = new SubtaskRepo();
        this.todoRepo = new TodoRepo();
    }

    async fetchAll(req) {
        try {
            const { query: queryParams } = req;
            const subtask = await this.subtaskRepo.applyFilters(queryParams).getAll();
            return subtask;
        } catch (e) {
            throw new Error(e);
        }
    }

    async create(req) {
        const { body } = req;
        const { todoId } = body;
        try {
            const todo = await this.todoRepo.findOrFail(todoId);
            const useCase = new CreateSubtaskUseCase(body, todo);
            return useCase.run();
        } catch (e) {
            throw new Error('Error creating Subtask');
        }
    }
}

module.exports = { SubtaskController }
