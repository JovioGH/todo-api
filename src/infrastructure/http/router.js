const express = require('express');
const { SubtaskRouter } = require('./routes/Subtask');
const { TodoRouter } = require('./routes/Todo');

const v1Router = express.Router();

v1Router.use('/todos', TodoRouter);
v1Router.use('/subtask', SubtaskRouter);

module.exports = { v1Router };
