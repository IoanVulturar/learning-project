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

const addUser = async (user) => {
    // const hashedPassword = await bcrypt.hash(user.password, 10)

    const userToAdd = new userModel({
        userName: user.userName,
        password: user.password,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role
    })

    try {
        const newUser = await userToAdd.save()
        if (!newUser) {
            return "User has not been added"
        }
        return 'New user has been added'
    } catch (err) {
        return Promise.reject('Cannot add user -> ' + err)
    }
}

const updateUser = async (id, user) => {
    try {
        const userToUpdate = await userModel.findById(id)
        if (!userToUpdate) {
            return 'User not found for update'
        }

        userToUpdate.userName = user.userName || userToUpdate.userName
        userToUpdate.password = user.password || userToUpdate.password
        userToUpdate.email = user.email || userToUpdate.email
        userToUpdate.phoneNumber = user.phoneNumber || userToUpdate.phoneNumber
        userToUpdate.role = user.role || userToUpdate.role

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