const { Todo } = require('../../../infrastructure/database/models/Todo');
const { BaseUseCase } = require('../../utils/BaseUseCase')

class DeleteTodoUseCase extends BaseUseCase {
    constructor(todo) {
        super();

        this.todo = todo;
    }

    execute() {
        return this.todo.destroy(this.todo);
    }

    run() {
        const model = new Todo();
        return model.sequelize.transaction(async (t) => {
            return this.execute();
        });
    }
}

module.exports = { DeleteTodoUseCase };
