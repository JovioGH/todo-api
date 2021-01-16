const { isNil, isEmpty } = require('lodash');
const { ModelNotFoundException } = require('../../../exceptions/ModelNotFoundException');
const { Subtask } = require('../../../infrastructure/database/models/Subtask');
const { Todo } = require('../../../infrastructure/database/models/Todo');

class TodoRepo {
    constructor() {
        this.scopes = [];
        this.requestParams = {};
    }

    resetScopes() {
        this.scopes = [];
    }

    applyFilters(params) {
        this.requestParams = params;
        this.resetScopes();

        if (!isNil(params.status) && !isEmpty(params.status)) {
            this.scopes.push(
                {
                    method: ['byStatus', params.status]
                }
            )
        }

        return this;
    }

    async getAll() {
        return await Todo.scope(this.scopes).findAndCountAll({
            include: [
                {
                    model: Subtask,
                    required: false,
                    separate: false
                }
            ],
            distinct: true,
            order: [['createdAt', 'DESC']]
        });
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

