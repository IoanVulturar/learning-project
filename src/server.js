const express = require('express')
const cookieParser = require('cookie-parser')
const db = require('./config/database')

require('dotenv').config()

const app = express()

app.use(cookieParser())
app.use(express.json())

const userRoutes = require('./routes/userRoutes')
app.use('/users', userRoutes)

const loginRoutes = require('./routes/loginRoutes')
app.use('/login', loginRoutes)

app.listen(process.env.PORT, () => {
    console.log(">>> Server started <<<")
    db.connectToDatabase()
})