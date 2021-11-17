const Joi = require('joi');
const { pick } = require('lodash');

class BaseUseCase {
    sanitizeParams(params, joiObject) {
        const sanitizedParams = pick(params, Object.keys(joiObject.describe().keys));
        if (joiObject) {
            Joi.assert(sanitizedParams, joiObject);
        }

        return sanitizedParams;
    }
}

module.exports = { BaseUseCase }
