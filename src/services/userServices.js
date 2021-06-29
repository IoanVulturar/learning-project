const userModel = require('../models/userModel')
// const bcrypt = require('bcrypt')

const getUsers = async () => {
    try {
        const users = await userModel.find()
        if (!users) {
            return "Users not found"
        }
        return users
    } catch (err) {
        return Promise.reject('Cannot find users -> ' + err)
    }
}

const getUser = async (id) => {
    try {
        const user = await userModel.findById(id)
        if (!user) {
            return "User not found"
        }
        return user
    } catch (err) {
        return Promise.reject('Cannot find user -> ' + err)
    }
}

const addUser = async (userName, password, email, phoneNumber, role) => {
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
        return 'New user has been added'
    } catch (err) {
        return Promise.reject('Cannot add user -> ' + err)
    }
}

const updateUser = async (id, userName, password, email, phoneNumber, role) => {
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
        return 'User has been updated'
    } catch (err) {
        return Promise.reject('Cannot update user -> ' + err)
    }
}

const removeUser = async (id) => {
    try {
        const userToRemove = await userModel.findById(id)
        if (!userToRemove) {
            return 'User not found for deletion'
        }

        await userToRemove.remove()
        return 'User removed'
    } catch (err) {
        return Promise.reject('Cannot remove user -> ' + err)
    }
}

module.exports = {
    getUsers,
    addUser,
    getUser,
    updateUser,
    removeUser
}