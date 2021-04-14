const express = require('express')
const Order = require('../models/orders')
const Product = require('../models/product')
const router = express.Router()
const authuser = require('../midleware/auth')
router.get('/', (req, res,next)=> {

   Order.find().select('product quantiy _id').populate('product', 'name price _id').exec().then( orders => {
        if(orders) {

            res.status(200).json({
                message: "All Orders",
                orders: orders
            })
           
           
        }
   }).then( err => { 
       if( err ) {
           res.status(500).json({
               errors:err
           })
       }
   })

})

router.post('/', (req, res,next)=> {
    // check whether the product exist before adding order
   
   Product.findById(req.body.product)
        .exec().
        then( product => {

            if(!product) {
                res.status(404).json({
                    errors: "Product Not Found"
                })
                return
            }

                const order = new Order({
                    quantity: req.body.quantity,
                    product: req.body.product
                })
                 
                order.save().then( order => {
                    if(order){
                        res.status(200).json({
                            order: {
                                quantity: order.quantity,
                                id: order._id,
                                productID: order.product,
                                product_name: product.name,
                                product_price:  product.price
                            }
                        })
                    }
                }).catch(err => {
                    if(err) {
                        res.status(500).json({
                            error: err
                        })
                    }
                })

                
            }).catch( err => {
                if(err) {
                    res.status(404).json({
                        errors: "Product Not Found"
                    })
                }
            })
        }

)

router.get('/:orderID', (req, res, next)=> {
    Order.findById(req.params.orderID).select('product quantity _id').populate('product', 'name price _id').then( order => {
            if(!order) {
                res.status(404).json({
                    errors: "Order Not Found"
                })
                return  
            }
        if(order) {
            res.status(200).json({
                message: 'All oders', 
                order: order
                })
        }

    }).catch( err => {
        if(err) {
            res.status(500).json({
                errors:err
            })
        }
    })
})

router.delete('/:orderID', (req, res) => {
    Order.remove({_id: req.params.orderID}).then( response => {
        if(response) {
            res.status(200).json({
                message: 'Order deleted successfully'
            })
        }
    }).catch( err => {
        if(err) {
            res.status(500).json({
                errors: err
            })
        }
    })
})
module.exports = router