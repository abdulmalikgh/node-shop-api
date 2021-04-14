const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const tokenData = req.headers.authorization.split(" ")[1]
    try {
        const token = jwt.verify(tokenData, 'process.env.SECRET')
        req.token = token
    } catch (error) {
        console.log('err', error)
        res.status(401).json({
            message:'Unauthenticated'
        })
    }

    next()
}