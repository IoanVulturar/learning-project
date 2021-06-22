const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log("Connected to Database"))

app.use(express.json())

const usersRoute = require('./routes/usersRoute')
app.use('/users', usersRoute)

app.listen(process.env.PORT, () => console.log("Server started..."))