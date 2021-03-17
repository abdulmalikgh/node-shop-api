const express = require('express')

const router = express.Router()

router.get('/', (req, res,next)=> {
    res.json({
        message: 'sending get request'
    })
})

router.post('/', (req, res,next)=> {
    res.json({
        message: 'posting new product'
    })
})

router.post('/:productID', (req, res,next)=> {
    res.json({
        id: req.params.productID
    })
})

router.patch('/:productID', (req, res,next)=> {
    res.json({
        id: req.params.productID
    })
})

router.delete('/:productID', (req, res,next)=> {
    res.json({
        id: req.params.productID
    })
})

module.exports = router