const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

const productsRoute = require('./api/routes/products')

const ordersRoute = require('./api/routes/orders')

const userRoutes = require('./api/routes/user')

const DB_URL = `mongodb://localhost/node-shop`
mongoose.connect(DB_URL, 
    {
        useUnifiedTopology: true ,
        useNewUrlParser: true,
        useFindAndModify: false
    })
// middlewares 
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use('/products', productsRoute)
app.use('/orders', ordersRoute)
app.use('/user', userRoutes)
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