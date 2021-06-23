const userServices = require('../services/userServices')
const { emailValidator, phoneValidator } = require('../utils/validators')

const getUsers = async (req, res) => {
    try {
        const users = await userServices.getUsers(req, res)
        res.status(200).json(users)
    } catch (err) {
        res.status(400).json({ status: 400, message: err.message })
    }
}

const getUser = async (req, res) => {

    try {
        const user = await userServices.getUser(req, res)
        res.json({ status: 200, user })
        // res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: 'Controller error message!' })
        // status() doesn't work - add status code to json()
    }
}

const addUser = async (req, res) => {
    const { email, phoneNumber } = req.body

    if (!emailValidator(email)) {
        return res.status(400).json({ message: "Invalid email!" })
    }
    if (!phoneValidator(phoneNumber)) {
        return res.status(400).json({ message: "Invalid phone number!" })
    }

    try {
        const user = await userServices.addUser(req, res)
        res.status(201).json(user)

    } catch (err) {
        res.json({ status: err.status, message: "usersController: " + err.message })
    }
}

const updateUser = async (req, res) => {

    const { email, phoneNumber } = req.body

    if (!emailValidator(email)) {
        return res.status(400).json({ message: "Invalid email!" })
    }
    if (!phoneValidator(phoneNumber)) {
        return res.status(400).json({ message: "Invalid phone number!" })
    }

    try {
        const user = await userServices.updateUser(req, res)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const removeUser = async (req, res) => {
    try {
        const user = await userServices.removeUser(req, res)
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