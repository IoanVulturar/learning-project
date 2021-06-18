const usersService = require('../services/usersService')

const getUsers = async (req, res) => {
    try {
        const users = await usersService.getUsers(req, res)
        res.status(200).json(users)
    } catch (err) {
        res.status(400).json({ status: 400, message: err.message })
    }
}

const addUser = async (req, res) => {

    try {
        const user = await usersService.addUser(req, res)
        res.status(200).json(user)
    } catch (err) {
        res.json({ status: err.status, message: "usersController: " + err.message })
    }
}

module.exports = {
    getUsers,
    addUser
}