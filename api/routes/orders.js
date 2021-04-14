const express = require('express')
const router = express.Router()
const authuser = require('../middleware/auth-user')
const {get_order, get_orders, delete_order, post_order } = require('../controllers/order')

router.get('/', authuser, get_orders)

router.post('/', authuser, post_order)

router.get('/:orderID',authuser, get_order)

router.delete('/:orderID', authuser, delete_order)

module.exports = router