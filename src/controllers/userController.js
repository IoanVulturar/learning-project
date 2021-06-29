const userServices = require('../services/userServices')
const { userNameValidator, emailValidator, phoneValidator, passwordValidator } = require('../utils/validators')

const getUsers = async (req, res) => {
    try {
        const users = await userServices.getUsers()
        res.status(200).json({ users })
    } catch (err) {
        res.status(500).send(err)
    }
}

const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await userServices.getUser(id)
        res.status(200).json({ user })
    } catch (err) {
        res.status(500).send(err)
    }
}

const addUser = async (req, res) => {
    const { userName, password, email, phoneNumber, role } = req.body

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
        const message = await userServices.addUser(userName, password, email, phoneNumber, role)
        res.status(201).send(message)
    } catch (err) {
        res.status(500).send(err)
    }
}

const updateUser = async (req, res) => {
    const { userName, password, email, phoneNumber, role } = req.body
    const { id } = req.params

    if (!userNameValidator(userName)) {
        return res.json({ message: "Invalid username" })
    }
    if (!emailValidator(email)) {
        return res.status(400).json({ message: "Invalid email!" })
    }
    if (!phoneValidator(phoneNumber)) {
        return res.status(400).json({ message: "Invalid phone number!" })
    }
    // if (!passwordValidator(password)) {
    //     return res.json({ message: "Invalid password" })
    // }

    try {
        const message = await userServices.updateUser(id, userName, password, email, phoneNumber, role)
        res.status(200).send(message)
    } catch (err) {
        res.status(500).send(err)
    }
}

const removeUser = async (req, res) => {
    const { id } = req.params
    try {
        const message = await userServices.removeUser(id)
        res.status(200).send(message)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    removeUser
}