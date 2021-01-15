const { Subtask } = require('../../../infrastructure/database/models/Subtask');
const { BaseUseCase } = require('../../utils/BaseUseCase');
const { CREATE_SUBTASK } = require('../validators');

class CreateSubtaskUseCase extends BaseUseCase {
    constructor(params, todo) {
        super();

        this.params = params;
        this.todo = todo;
    }

    async execute() {
        const sanitizedParams = this.sanitizeParams(this.params, CREATE_SUBTASK);

        if (await this.isNamedUsed(sanitizedParams.name)) {
            throw new Error('Subtask name is already used');
        }

        const subtask = Subtask.build(sanitizedParams);
        subtask.setTodo(this.todo, { save: false });
        return await subtask.save();
    }

    async isNamedUsed(name) {
        const count = await Subtask.count({ where: { name } });
        return count >= 1;
    }

    run() {
        const model = new Subtask();
        return model.sequelize.transaction(async (t) => {
            return this.execute();
        });
    }
}

module.exports = { CreateSubtaskUseCase }
