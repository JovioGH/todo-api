const Joi = require('joi')

const CREATE_TODO = Joi.object().keys({
    name: Joi.string()
        .max(255)
        .min(5),
    status: Joi.string()
        .optional()
})

module.exports = {
    CREATE_TODO
}
