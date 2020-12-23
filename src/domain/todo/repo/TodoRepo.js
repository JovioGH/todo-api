const db = require('../../../infrastructure/database/manager');

class TodoRepo {
    constructor() {
        this.scopes = [];
        this.requestParams = {}
    }

    async getAll() {
        const results = await db.Todo.findAll();
        return results;
    }
}

module.exports = { TodoRepo }

