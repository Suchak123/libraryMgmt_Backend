const joi = require('joi');
const {joiPasswordExtendCore} = require('joi-password');
// const { signupUser } = require('../../user/controllers/userController');
const joiPassword = joi.extend(joiPasswordExtendCore);

const userValSchema = {
    signupUser: joi.object({
        userName: joi
        .string()
        .max(20)
        .min(3)
        .message({
            "string.min": "{#label} should be at least {#limit} characters",
            "string.max": "{#label} should be at most {#limit} characters",
        })
        .required(),
        userEmail: joi
            .string()
            .email()
            .min(11)
            .message({
                "string.min": "{#label} should be at least {#limit} characters",
                "string.max": "{#label} should be at most {#limit} characters",
            })
            .required(),
        userPassword: joiPassword
        .string()
        .min(7)
        .required(),
        

    }).unknown(true),

    userLogin: joi.object({
        userEmail: joi
        .string()
        .email()
        .required(),
        userPassword: joi
        .string()
        .required(),
    }).unknown(true),
}

module.exports = userValSchema;