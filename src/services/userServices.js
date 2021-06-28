const userModel = require('../models/userModel')
// const bcrypt = require('bcrypt')

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        if (!users) {
            return "Users not found"
        }
        return users
    } catch (err) {
        return Promise.reject({ status: 404, message: 'Resource Not Found' })
    }
}

const getUser = async (req) => {
    const { id } = req.params

    try {
        const user = await userModel.findById(id)
        if (!user) {
            return "User not found"
        }
        return user
    } catch (err) {
        return Promise.reject({ status: 404, message: 'Resource Not Found' })
    }
}

const addUser = async (req) => {
    const { userName, password, email, phoneNumber, role } = req.body
    // const hashedPassword = await bcrypt.hash(password, 10)

    const user = new userModel({
        userName: userName,
        password: password,
        email: email,
        phoneNumber: phoneNumber,
        role: role
    })

    try {
        const newUser = await user.save()
        if (!newUser) {
            return "User has not been added"
        }
        return { status: 201, message: 'New user has been added' }
    } catch (err) {
        return Promise.reject({ status: 400, message: 'Cannot add user' })
    }
}

const updateUser = async (req, res) => {
    const { userName, email, phoneNumber, role } = req.body
    const { id } = req.params

    try {
        const userToUpdate = await userModel.findById(id)
        if (!userToUpdate) {
            return 'User not found for update'
        }

        userToUpdate.userName = userName || userToUpdate.userName
        userToUpdate.password = password || userToUpdate.password
        userToUpdate.email = email || userToUpdate.email
        userToUpdate.phoneNumber = phoneNumber || userToUpdate.phoneNumber
        userToUpdate.role = role || userToUpdate.role

        await userToUpdate.save()
        return { status: 200, message: 'User has been updated' }
    } catch (err) {
        return Promise.reject({ status: 404, message: 'Resource Not Found' })
    }
}

const removeUser = async (req) => {
    const { id } = req.params

    try {
        const userToRemove = await userModel.findById(id)
        if (!userToRemove) {
            return 'User not found for deletion'
        }

        await userToRemove.remove()
        return { status: 200, message: 'User removed' }
    } catch (err) {
        return Promise.reject({ status: 404, message: 'Resource Not Found' })
    }
}

module.exports = {
    getUsers,
    addUser,
    getUser,
    updateUser,
    removeUser
}