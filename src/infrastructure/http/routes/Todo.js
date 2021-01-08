const { Router } = require('express');
const { TodoController } = require('./../controllers/Todo');

const TodoRouter = Router();
const controller = new TodoController();

TodoRouter.get('/', async (req, res, next) => {
    try {
        const todos = await controller.fetchAll(req);
        res.status(200).send(todos);
    } catch (error) {
        next(error);
    }
});


TodoRouter.post('/', async (req, res, next) => {
    try {
        const createdTodo = await controller.create(req)
        res.status(200).send(createdTodo);
    } catch (error) {
        next(error);
    }
})

module.exports = { TodoRouter };
