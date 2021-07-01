const jwt = require('jsonwebtoken')
const logger = require('../logger/logger')

module.exports = async (user) => {
    let payload = { username: user.username }
    try {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '20s' })
        logger().info('User ACCESS TOKEN created')
        return accessToken
    } catch (err) {
        logger().error('Cannot create user ACCESS TOKEN')
        return Promise.reject('Cannot create token -> ' + err)
    }
}