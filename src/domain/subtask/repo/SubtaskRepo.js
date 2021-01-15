const { ModelNotFoundException } = require('../../../exceptions/ModelNotFoundException');
const { Subtask } = require('../../../infrastructure/database/models/Subtask');

class SubtaskRepo {
    constructor() {
        this.scopes = [];
        this.requestParams = {};
    }

    async getAll() {
        return await Subtask.findAll();
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
