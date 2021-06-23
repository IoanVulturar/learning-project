const express = require('express')
const db = require('./config/database')

require('dotenv').config()

const app = express()

app.use(express.json())

const userRoutes = require('./routes/userRoutes')
app.use('/users', userRoutes)

app.listen(process.env.PORT, () => {
    console.log(">>> Server started <<<")
    db.connectToDatabase()
})