function ErrorMiddleware(err, req, res, next) {
    console.error(err.stack);
    const status = err.status || 400;
    const message = err.message || 'Something broke!';
    res.status(status).send({ status, message });
}

module.exports = { ErrorMiddleware };
