const Joi = require('joi');

const sizeSchema = Joi.object({
    width : Joi.number().required(),
    height : Joi.number().required(),
    quality :Joi.number().required(),
    format :Joi.string().required(),
})

module.exports = sizeSchema;