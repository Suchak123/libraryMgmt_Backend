const express = require('express');

require('dotenv').config()
require('./config/modelConfig')

const mainRouter = require('./urls')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.use('/', mainRouter)

const PORT = process.env.PORT || 9000

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})

