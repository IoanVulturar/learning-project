const mongoose = require('mongoose')
require('dotenv').config()

const connectToDatabase = () => {
    mongoose.connect(
        process.env.DATABASE,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    const db = mongoose.connection
    db.on('error', (err) => console.error(err))
    db.once('open', () => console.log(">>> Connected to Database <<<"))
}

module.exports = {
    connectToDatabase
}