const usersModel = require('../models/usersModel')

const getUsers = async (req, res) => {
    try {
        const users = await usersModel.find()
        res.json(users)
    } catch (err) {
        res.status(400).json({ status: 400, message: err.message })
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

module.exports = {
    getUsers,
    addUser
}