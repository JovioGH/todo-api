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
        res.status(200).json(createdTodo);
    } catch (error) {
        next(error);
    }
});

TodoRouter.put('/:id(\\d+)', async (req, res, next) => {
    try {
        const updateTodo = await controller.update(req);
        res.status(200).send(updateTodo);
    } catch (error) {
        next(error);
    }
});

TodoRouter.delete('/:id(\\d+)', async (req, res, next) => {
    try {
        const deletedTodo = await controller.delete(req);
        res.status(200).send(deletedTodo);
    } catch (error) {
        next(error);
    }

});

module.exports = { TodoRouter };
