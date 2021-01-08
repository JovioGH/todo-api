const Joi = require('joi');
const { pick } = require('lodash');
const { Todo } = require('../../../infrastructure/database/models/Todo');
const { CREATE_TODO } = require('../validators');


class CreateTodoUseCase {
    constructor(params) {
        this.params = params;
    }

    async execute() {
        const sanitizedParams = this.sanitizeParams(this.params, CREATE_TODO);

        if (await this.isNameUsed(sanitizedParams.name)) {
            throw new Error('Todo name is already used')
        }

        const todo = Todo.build(sanitizedParams);
        return await todo.save();
    }

    sanitizeParams(params, joiObject) {
        const sanitizedParams = pick(params, Object.keys(joiObject.describe().keys));
        if (joiObject) {
            Joi.assert(sanitizedParams, joiObject);
        }

        return sanitizedParams;
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

module.exports = { CreateTodoUseCase }
