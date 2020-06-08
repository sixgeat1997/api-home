const Joi = require('@hapi/joi')

const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    des: Joi.string().min(3).max(100).required(),
    cateory: Joi.string().min(0).max(10).required(),
    type: Joi.string().min(0).max(10).required(),
    latitude: Joi.string().min(0).max(15).required(),
    longitude: Joi.string().min(0).max(15).required(),
    tel: Joi.string().min(0).max(15).required(),
    area: Joi.any().required(),
    price: Joi.any().required(),
})

const validation = (schema) => {
    return ((req, res, next) => {
        Joi.valid(req.body, schema, (error, value) => {
            if (error) return res.status(400).json({
                "status": 400,
                "message": error.details[0].message
            })
            if (!error) next()
        })
    })
}


module.exports = { validation, schema }