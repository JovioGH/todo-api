const { Router } = require('express');
const { SubtaskController } = require('../controllers/Subtask');


const SubtaskRouter = Router();
const controller = new SubtaskController();

SubtaskRouter.get('/', async (req, res, next) => {
    try {
        const todos = await controller.fetchAll(req);
        res.status(200).send(todos);
    } catch (error) {
        next(error);
    }
});

SubtaskRouter.post('/', async (req, res, next) => {
    try {
        const createdSubtask = await controller.create(req);
        res.status(200).json(createdSubtask);
    } catch (error) {
        next(error);
    }
});

module.exports = { SubtaskRouter }
