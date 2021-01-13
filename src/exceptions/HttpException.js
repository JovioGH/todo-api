class HttpException extends Error {
    constructor(httpStatusCode, message) {
        super(message);
        this.status = httpStatusCode;
        this.message = message;
    }
}

module.exports = { HttpException }
