const Joi = require('joi')

const CREATE_TODO = Joi.object().keys({
    name: Joi.string()
        .max(255)
        .min(5),
    status: Joi.string()
        .optional()
});

const UPDATE_TODO = Joi.object().keys({
    name: Joi.string()
        .max(255)
        .min(5),
    status: Joi.string()
        .valid('pending', 'done', 'doing')
        .optional()
});

module.exports = {
    CREATE_TODO,
    UPDATE_TODO
}
