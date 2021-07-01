const logger = require('../logger/logger')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    let accessToken = req.cookies.jwt
    if (!accessToken) {
        logger().warn('There is no access token for this user')
        return res.status(401).send('There is no access token for this user')
    }

    if (req.baseUrl === '/users' && req.method === 'POST') {
        return next()
    }

    try {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        next()
    } catch (err) {
        logger().warn('Expired or invalid token')
        return res.status(401).send('Expired or invalid token for this user')
    }
}