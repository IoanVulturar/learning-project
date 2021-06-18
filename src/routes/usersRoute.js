const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')


router
    .get('/', usersController.getUsers)
    .get('/:id', usersController.getUser)
    .post('/', usersController.addUser)
    .patch('/:id', usersController.updateUser)
    .delete('/:id', usersController.removeUser)

module.exports = router