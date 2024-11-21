const joi = require('joi')

const bookValidationSchema = {
    addBook: joi.object({
        bookName: joi
        .string()
        .max(35)
        .min(1)
        .message({
            "string.min": "{#label} should be at least {#limit} characters",
            "string.max": "{#label} should be at least {#limit} characters"
        })
        .required(),
        bookDescription: joi
        .number()
        .max(350)
        .min(7)
        .required(),

        bookAuthor: joi
        .string()
        .max(20)
        .min(3)
        .required(),

        bookCategory: joi
        .string()
        .max(20)
        .min(2)
        .required()
    }).unknown(true)
};

module.exports = bookValidationSchema