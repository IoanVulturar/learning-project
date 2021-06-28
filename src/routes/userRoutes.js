const express = require('express')
const { verifyAccess } = require('../utils/middleware')
const router = express.Router()
const userController = require('../controllers/userController')

router
    .get('/', verifyAccess, userController.getUsers)
    .get('/:id', verifyAccess, userController.getUser)
    .post('/', userController.addUser)
    .patch('/:id', verifyAccess, userController.updateUser)
    .delete('/:id', verifyAccess, userController.removeUser)

module.exports = router