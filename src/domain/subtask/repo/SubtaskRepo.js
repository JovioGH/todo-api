const { isNil, isEmpty } = require('lodash');
const { ModelNotFoundException } = require('../../../exceptions/ModelNotFoundException');
const { Subtask } = require('../../../infrastructure/database/models/Subtask');

class SubtaskRepo {
    constructor() {
        this.scopes = [];
        this.requestParams = {};
    }

    resetScopes() {
        // Always reset scopes to avoid stale queries
        this.scopes = [];
    }

    applyFilters(params) {
        this.requestParams = params;
        this.resetScopes();

        if (!isNil(params.todoId) && !isEmpty(params.todoId)) {
            this.scopes.push(
                {
                    method: ['byTodo', params.todoId]
                }
            );
        }

        if (!isNil(params.status) && !isEmpty(params.status)) {
            this.scopes.push(
                {
                    method: ['byStatus', params.status]
                }
            );
        }

        return this;
    }

    async getAll() {
        const subtask = await Subtask.scope(this.scopes).findAndCountAll();

        return {
            count: subtask.count,
            rows: subtask.rows
        }
    }

    async findOrFail(id) {
        try {
            const subtask = await Subtask.scope().findByPk(id, { rejectOnEmpty: true });
            return subtask;
        } catch (error) {
            throw new ModelNotFoundException(`Subtask with id ${id} not found`);
        }
    }
}

module.exports = { SubtaskRepo };
