const { isNil, isEmpty } = require("lodash");
const {
  ModelNotFoundException,
} = require("../../../exceptions/ModelNotFoundException");
const { Subtask } = require("../../../infrastructure/database/models/Subtask");
const { subtaskErrors } = require("../errors");

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
    if (!params.todo_id) {
      throw new Error(subtaskErrors.NO_TODO_ID);
    }

    this.requestParams = params;
    this.resetScopes();

    if (!isNil(params.todo_id) && !isEmpty(params.todo_id)) {
      this.scopes.push({
        method: ["byTodo", params.todo_id],
      });
    }

    if (!isNil(params.status) && !isEmpty(params.status)) {
      this.scopes.push({
        method: ["byStatus", params.status],
      });
    }

    return this;
  }

  async getAll() {
    return await Subtask.scope(this.scopes).findAndCountAll();
  }

  async findOrFail(id) {
    try {
      const subtask = await Subtask.scope().findByPk(id, {
        rejectOnEmpty: true,
      });
      return subtask;
    } catch (error) {
      throw new ModelNotFoundException(`Subtask with id ${id} not found`);
    }
  }
}

module.exports = { SubtaskRepo };
