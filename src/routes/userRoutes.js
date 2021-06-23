const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router
    .get('/', userController.getUsers)
    .get('/:id', userController.getUser)
    .post('/', userController.addUser)
    .patch('/:id', userController.updateUser)
    .delete('/:id', userController.removeUser)

module.exports = router