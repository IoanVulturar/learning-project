const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

const verifyAccess = require('../utils/loginAuth')
router.use(verifyAccess)

router
    .get('/', userController.getUsers)
    .get('/:id', userController.getUser)
    .post('/', userController.addUser)
    .patch('/:id', userController.updateUser)
    .delete('/:id', userController.removeUser)

module.exports = router