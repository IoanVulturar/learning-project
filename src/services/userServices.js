const userModel = require('../models/userModel')

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        return users
    } catch (err) {
        return 'Database error: getUsers() method - Status code: ' + err.status
    }
}

const getUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = await userModel.findById(id)
        if (!user) {
            return "User not found!"
        }
        return user
    } catch (err) {
        return 'Database error: getUser() method - Status code: ' + err.status
    }
}

const addUser = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, role } = req.body
    const user = new userModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        role: role
    })

    try {
        const newUser = await user.save()
        return 'User has been added!'
        // res.json({ status: '201', newUser })
        // res.status(201).json(newUser)
        // return newUser
    } catch (err) {
        return 'Database error: addUser() method - Status code: ' + err.status
    }
}

const updateUser = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, role } = req.body
    const { id } = req.params

    try {
        const userToUpdate = await userModel.findById(id)
        if (!userToUpdate) {
            return 'User not found for update!'
        }

        userToUpdate.firstName = firstName || userToUpdate.firstName
        userToUpdate.lastName = lastName || userToUpdate.lastName
        userToUpdate.email = email || userToUpdate.email
        userToUpdate.phoneNumber = phoneNumber || userToUpdate.phoneNumber
        userToUpdate.role = role || userToUpdate.role

        await userToUpdate.save()

        res.json(userToUpdate)
    } catch (err) {
        return 'Database error: updateUser() method - Status code: ' + err.status
    }
}

const removeUser = async (req, res) => {
    const { id } = req.params

    try {
        const userToRemove = await userModel.findById(id)
        if (!userToRemove) {
            return 'User not found for deletion!'
        }

        await userToRemove.remove()
        return "User removed!"
    } catch (err) {
        return 'Database error: removeUser() method - Status code: ' + err.status
    }
}

module.exports = {
    getUsers,
    addUser,
    getUser,
    updateUser,
    removeUser
}