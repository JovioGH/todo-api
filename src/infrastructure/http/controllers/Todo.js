class TodoController {
    constructor(
    ) { }

    async fetchAll(req) {
        const { query } = req;
        console.log('<-- query params -->', query);
        return {
            todos: ['Great move']
        }
    }
}

module.exports = { TodoController };
