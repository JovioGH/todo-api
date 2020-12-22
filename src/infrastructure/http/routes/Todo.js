const { Router } = require('express');
const { TodoController } = require('./../controllers/Todo');

const TodoRouter = Router();
const controller = new TodoController();

TodoRouter.get('/', async (req, res, next) => {
    try {
        const todos = await controller.fetchAll(req);
        res.status(200).send(todos);
    } catch (error) {
        console.error('<-- Error here -->');
        next(error);
    }
});


module.exports = { TodoRouter };
