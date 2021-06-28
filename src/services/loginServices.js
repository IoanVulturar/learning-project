const jwt = require('jsonwebtoken')

const login = async (req, res, user) => {
    let payload = { username: user.username }
    try {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '2m' })
        res.cookie('jwt', accessToken, { httpOnly: true })
    } catch (err) {
        return Promise.reject({ message: 'Cannot create token' })
    }
}

module.exports = {
    login
}