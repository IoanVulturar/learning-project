const loginServices = require('../services/loginServices')
const userModel = require('../models/userModel')
const { userNameValidator, passwordValidator } = require('../utils/validators')
// const bcrypt = require('bcrypt')

const login = async (req, res) => {
    const { userName, password } = req.body
    if (!userNameValidator(userName)) {
        return res.json({ message: "Username doesn't match the requirements" })
    }
    // if (!passwordValidator(password)) {
    //     return res.json({ message: "Password doesn't match the requirements (pass >3, aA0!?_)" })
    // }

    const user = await userModel.findOne({ userName })
    if (!user) {
        return res.json({ status: 404, message: 'Cannot find user' })
    }
    if (password !== user.password) {
        return res.json({ message: 'Invalid password' })
    }
    // if (!await bcrypt.compare(password, user.password)) {
    //     return res.json({ message: 'Invalid password' })
    // }

    try {
        await loginServices.login(req, res, user)
        res.json({ status: 200, message: `Welcome, ${user.userName}` })
    } catch (err) {
        res.json(err)
    }
}

module.exports = {
    login
}