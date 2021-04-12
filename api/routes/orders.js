const express = require('express')

const router = express.Router()

router.get('/', (req, res,next)=> {
    res.json({
        message: 'sending get request'
    })
})

router.post('/', (req, res,next)=> {
    const body = req.body
    const data = {
        name: body.name,
        price: body.price
    }
    
    res.json({
        message: 'posting new product'
    })
})

router.post('/:orderID', (req, res,next)=> {
    res.json({
        id: req.params.orderID
    })
})

router.delete('/:orderD', (req, res,next)=> {
    res.json({
        id: req.params.orderID
    })
})

module.exports = router