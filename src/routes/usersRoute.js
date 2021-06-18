const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')


router
    .get('/', usersController.getUsers)
    .post('/', usersController.addUser)

module.exports = router