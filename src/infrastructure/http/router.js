const express = require('express');
const { TodoRouter } = require('./routes/Todo');

const v1Router = express.Router();

v1Router.use('/todos', TodoRouter);

module.exports = { v1Router };
