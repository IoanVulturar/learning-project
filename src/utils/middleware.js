const jwt = require('jsonwebtoken')

const verifyAccess = (req, res, next) => {
    let accessToken = req.cookies.jwt
    if (!accessToken) {
        return res.status(401).send()
    }

    try {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        next()
    } catch (err) {
        return res.status(401).send()
    }
}

module.exports = {
    verifyAccess
}