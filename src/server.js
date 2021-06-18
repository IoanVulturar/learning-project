const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log("Connected to Database"))

app.use(express.json())

const usersRouter = require('./routes/usersRoute')
app.use('/users', usersRouter)

app.listen(process.env.PORT, () => console.log("Server started..."))