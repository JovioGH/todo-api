const { Todo } = require('../../../infrastructure/database/models/Todo');
const { BaseUseCase } = require('../../utils/BaseUseCase');
const { UPDATE_TODO } = require('../validators');


class UpdateTodoUseCase extends BaseUseCase {
    constructor(params, todo) {
        super();
        this.todo = todo;
        this.params = params;
    }

    async execute() {
        const sanitizedParams = this.sanitizeParams(this.params, UPDATE_TODO);
        this.todo.set(sanitizedParams);

        if (this.todo.changed('name')) {
            const isNameUsed = await this.isNameUsed(sanitizedParams.name);
            if (isNameUsed) {
                throw new Error(`Todo name [${sanitizedParams.name}] is not unique.`);
            }
        }

        const todo = this.todo.save();
        return todo;
    }

    async isNameUsed(name) {
        const count = await Todo.count({ where: { name } });
        return count >= 1;
    }

    run() {
        const model = new Todo();
        return model.sequelize.transaction(async (t) => {
            return this.execute();
        });
    }

}


module.exports = { UpdateTodoUseCase };
