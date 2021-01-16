const app = require('./app')
const config = require('config');

const appPort = process.env.NODE_ENV === 'test' ? 5001 : config.get('app.port');

app.listen(appPort, () => {
    console.log(`Server listening on ${appPort}`);
});

module.exports = app;
