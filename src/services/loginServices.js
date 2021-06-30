const jwt = require('jsonwebtoken')

module.exports = async (user) => {
    let payload = { username: user.username }
    try {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '20s' })
        return accessToken
    } catch (err) {
        return Promise.reject('Cannot create token -> ' + err)
    }
}