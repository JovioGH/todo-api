const Joi = require('joi')

const CREATE_SUBTASK = Joi.object().keys({
    name: Joi.string()
        .max(255)
        .min(5),
    status: Joi.string()
        .optional().
        valid('pending', 'doing', 'done')
});

module.exports = { CREATE_SUBTASK }
