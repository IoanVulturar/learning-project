const usersModel = require('../models/usersModel')

const getUsers = async (req, res) => {
    try {
        const users = await usersModel.find()
        res.json(users)
    } catch (err) {
        res.status(400).json({ status: 400, message: err.message })
    }
}

const getUser = async (req, res) => {
    try {
        const user = await usersModel.findById(req.params.id)
        if (!user) {
            res.status(404).json({ message: "Cannot find user" })
        }
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const addUser = async (req, res) => {
    const user = new usersModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.json({ status: err.status, message: "usersService: " + err.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const userToUpdate = await usersModel.findById(req.params.id)
        if (!userToUpdate) {
            res.status(404).json({ message: "Cannot find user" })
        }

        userToUpdate.firstName = req.body.firstName || userToUpdate.firstName
        userToUpdate.lastName = req.body.lastName || userToUpdate.lastName
        userToUpdate.email = req.body.email || userToUpdate.email
        userToUpdate.phoneNumber = req.body.phoneNumber || userToUpdate.phoneNumber
        userToUpdate.role = req.body.role || userToUpdate.role

        await userToUpdate.save()

        res.json(userToUpdate)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const removeUser = async (req, res) => {
    try {
        const userToRemove = await usersModel.findById(req.params.id)
        if (!userToRemove) {
            res.status(404).json({ message: "Cannot find user" })
        }

        await userToRemove.remove()
        res.json({ message: "User removed!" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getUsers,
    addUser,
    getUser,
    updateUser,
    removeUser
}