const express = require('express')
const cookieParser = require('cookie-parser')
const db = require('./config/database')
const cors = require('cors')
require('dotenv').config()

const corsOptions = {
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    origin: 'http://localhost:3000',
    credentials: true
}

const app = express()

app.use(cookieParser())
app.use(express.json())

app.use(cors(corsOptions))

const userRoutes = require('./routes/userRoutes')
app.use('/users', userRoutes)

const loginRoutes = require('./routes/loginRoutes')
app.use('/login', loginRoutes)

app.listen(process.env.PORT, () => {
    console.log(">>> Server started <<<")
    db.connectToDatabase()
})

require('./logger/test-logger') 