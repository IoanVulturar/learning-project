const loginService = require('../services/loginServices')
const userModel = require('../models/userModel')
const { userNameValidator, passwordValidator } = require('../utils/validators')
// const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    const { userName, password } = req.body
    if (!userNameValidator(userName)) {
        return res.status(403).jsend('Username doesn\'t match the requirements')
    }
    // if (!passwordValidator(password)) {
    //     return res.status(403).json({ message: "Password doesn't match the requirements (pass >3, aA0!?_)" })
    // }

    const user = await userModel.findOne({ userName })
    if (!user) {
        return res.status(500).send('Cannot find user')
    }
    if (password !== user.password) {
        return res.status(500).send('Invalid password')
    }
    // if (!await bcrypt.compare(password, user.password)) {
    //     return res.status(500).json({ message: 'Invalid password' })
    // }

    try {
        const accessToken = await loginService(user)
        res.cookie('jwt', accessToken, { httpOnly: true })
        res.status(200).send(`Welcome, ${user.userName}`)
    } catch (err) {
        res.status(500).send(err)
    }
}