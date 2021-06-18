const usersService = require('../services/usersService')

const getUsers = async (req, res) => {
    try {
        const users = await usersService.getUsers(req, res)
        res.status(200).json(users)
    } catch (err) {
        res.status(400).json({ status: 400, message: err.message })
    }
}


const getUser = async (req, res) => {
    try {
        const user = await usersService.getUser(req, res)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
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

const updateUser = async (req, res) => {
    try {
        const user = await usersService.updateUser(req, res)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const removeUser = async (req, res) => {
    try {
        const user = await usersService.removeUser(req, res)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    removeUser
}