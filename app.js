const express = require('express')

const app = express()

const productsRoute = require('./api/routes/products')

const ordersRoute = require('./api/routes/orders')

app.use('/products', productsRoute)
app.use('/orders', ordersRoute)

module.exports = app