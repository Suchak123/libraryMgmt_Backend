const express = require('express')

const userRouter = require('./user/routes/userRoute');
const categoryRouter = require('./admin/routes/categoryRoutes')
const bookRouter = require('./admin/routes/bookRoutes')
const adminRouter = require('./admin/routes/adminRoutes')

const commonRouter = express.Router()

commonRouter.use('/users', userRouter);
commonRouter.use('/category', categoryRouter)
commonRouter.use('/books', bookRouter)
commonRouter.use('/admin', adminRouter)

module.exports = commonRouter