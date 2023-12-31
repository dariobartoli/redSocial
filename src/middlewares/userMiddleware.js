const Joi = require('joi');

const userLogger = (req, res, next) =>{
    console.log("paso por users");
    next()
}

const isNumber = (req, res, next) => {
    const schema = Joi.number().required();
    const validationResult = schema.validate(req.params.id)
    if (validationResult.error) {
        res.status(404).json({message: validationResult.error.details[0].message})
        console.error(validationResult.error.details);
    }else{
    console.log('Data is valid');
    next()
    }
}

const dataValidation = (req, res, next) => {
    const schema = Joi.object({
        userName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        lastName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
    })
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
        res.status(404).json({message: validationResult.error.details[0].message})
        console.error(validationResult.error.details);
    }else{
    console.log('Data is valid');
    next()
    }
    

}

module.exports = {userLogger, isNumber, dataValidation}