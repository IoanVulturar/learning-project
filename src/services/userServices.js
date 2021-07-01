const userModel = require('../models/userModel')
const logger = require('../logger/logger')
// const bcrypt = require('bcrypt')

const getUsers = async () => {
    try {
        const users = await userModel.find()
        if (!users) {
            return "Users not found"
        }
        logger().info('Users Found')
        return users
    } catch (err) {
        logger().error('Cannot found users')
        return Promise.reject('Cannot find users -> ' + err)
    }
}

const getUser = async (id) => {
    try {
        const user = await userModel.findById(id)
        if (!user) {
            return "User not found"
        }
        logger().info('User Found')
        return user
    } catch (err) {
        logger().error('Cannot found user')
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
        logger().info('New User Added')
        return 'New user has been added'
    } catch (err) {
        logger().error('Cannot add user -> ' + err.message.split('dup key')[0] || err)
        return Promise.reject('Cannot add user -> ' + err.message.split('dup key')[0] || err)
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
        logger().info('User updated')
        return 'User has been updated'
    } catch (err) {
        logger().error('Cannot update user')
        return Promise.reject('Cannot update user -> ' + err)
    }
}

const removeUser = async (id) => {
    try {
        const userToRemove = await userModel.findById(id)
        if (!userToRemove) {
            logger().warn('User not found for deletion')
            return 'User not found for deletion'
        }

        await userToRemove.remove()
        logger().info('User removed')
        return 'User removed'
    } catch (err) {
        logger().error('Cannot remove user')
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