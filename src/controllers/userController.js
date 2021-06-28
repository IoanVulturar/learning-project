const userServices = require('../services/userServices')
const { userNameValidator, emailValidator, phoneValidator, passwordValidator } = require('../utils/validators')

const getUsers = async (req, res) => {
    try {
        const users = await userServices.getUsers(req, res)
        res.json({ status: 200, users })
    } catch (err) {
        res.json(err)
    }
}

const getUser = async (req, res) => {

    try {
        const user = await userServices.getUser(req, res)
        res.json({ status: 200, user })
    } catch (err) {
        res.json(err)
    }
}

const addUser = async (req, res) => {
    const { userName, email, phoneNumber, password } = req.body

    if (!userNameValidator(userName)) {
        return res.json({ message: "Invalid username" })
    }
    if (!emailValidator(email)) {
        return res.json({ message: "Invalid email" })
    }
    if (!phoneValidator(phoneNumber)) {
        return res.json({ message: "Invalid phone number" })
    }
    // if (!passwordValidator(password)) {
    //     return res.json({ message: "Invalid password" })
    // }

    try {
        const request = await userServices.addUser(req, res)
        res.json(request)

    } catch (err) {
        res.json(err)
    }
}

const updateUser = async (req, res) => {

    const { email, phoneNumber, password } = req.body

    if (!emailValidator(email)) {
        return res.status(400).json({ message: "Invalid email!" })
    }
    if (!phoneValidator(phoneNumber)) {
        return res.status(400).json({ message: "Invalid phone number!" })
    }
    if (!passwordValidator(password)) {
        return res.json({ message: "Invalid password" })
    }

    try {
        const request = await userServices.updateUser(req, res)
        res.json(request)
    } catch (err) {
        res.json(err)
    }
}

const removeUser = async (req, res) => {
    try {
        const request = await userServices.removeUser(req, res)
        res.json(request)
    } catch (err) {
        res.json(err)
    }
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    removeUser
}