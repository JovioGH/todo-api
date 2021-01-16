const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const { v1Router } = require('./router');
const { ErrorMiddleware } = require('../../middleware/error.middleware');

const app = express();
const isProduction = process.env.NODE_ENV === 'production';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(morgan('combined'));

if (!isProduction) {
    app.use(cors());
}

app.use('/health', (req, res) => {
    res.status(200).send('Todo API is alive');
});

app.use('/api/v1', v1Router);
app.use(ErrorMiddleware);



module.exports = app;
