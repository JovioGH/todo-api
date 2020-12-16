const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const config = require('config');

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const appPort = config.get('app.port');

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

app.listen(appPort, () => {
    console.log(`Server listening on ${appPort}`);
});

module.exports = app;
