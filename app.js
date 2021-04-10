const express = require('express')
const morgan = require('morgan')
const app = express()

const productsRoute = require('./api/routes/products')

const ordersRoute = require('./api/routes/orders')

// middlewares 
app.use(morgan('dev'))
app.use('/products', productsRoute)
app.use('/orders', ordersRoute)

// not found routes 
app.use((req, res, next) => {
    const error = new Error("Not Found")
    error.status = 404
    next(error)
})

// database errors
app.use((error,req, res, next)=> {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
} )
module.exports = app