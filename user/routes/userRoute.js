const express = require('express');

const userRouter = express.Router()
const {signupUser, loginUser, userDashboard} = require('../controllers/userController')
const userValidator = require('../../validations/userValidations/userValidator')
const { isUser } = require('../../middlewares/authService');
const userAuthentication = require('../../middlewares/authToken');

userRouter.post('/signupUser', userValidator.signupUserValidation, signupUser)
userRouter.post('/userLogin', isUser, userValidator.userLoginValidation, loginUser)
userRouter.get('/userDashboard', userAuthentication, userDashboard)

module.exports = userRouter
