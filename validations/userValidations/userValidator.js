const userValidationSchema = require("./userValSchema");

module.exports = {
    signupUserValidation: async (req, res, next) => {
        try {
            await userValidationSchema.signupUser.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (error) {
            return res.status(403).json({
                success: false,
                message: error.details[0].message
            });
        }
    },

    userLoginValidation: async (req, res, next) => {
        try {
            await userValidationSchema.userLogin.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (error) {
            return res.status(403).json({
                success: false,
                message: error.details[0].message
            });
        }
    },
};
