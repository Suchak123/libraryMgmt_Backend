const express = require('express')

const userAuthentication = require('../../middlewares/authToken')
const authService = require('../../middlewares/authService')
const userController = require('../../user/controllers/userController')
const adminController = require('../controllers/adminController')

const adminRoutes = express.Router()

adminRoutes.post('/adminLogin', authService.isAdmin, userController.loginUser)
adminRoutes.get('/adminDashboard', userAuthentication, adminController.adminDashboard)
adminRoutes.get('/viewUsers', userAuthentication, adminController.viewUsers)
adminRoutes.get('/userDetails/:userId', userAuthentication, adminController.userDetails)
adminRoutes.get('/borrowBooksList', userAuthentication, adminController.borrowBooksList)

module.exports = adminRoutes