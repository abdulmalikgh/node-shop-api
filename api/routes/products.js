const express = require('express')
const mongoose = require('mongoose')
const product = require('../models/product')
const Product = require('../models/product')
const multer = require('multer')
const router = express.Router()

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = function(req, file, cb) {
    // rejecting file types
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({storage: storage, limits: {
   fileSize: 1024 * 1024 * 5
}, fileFilter: fileFilter})

router.get('/', (req, res,next)=> {
    Product.find().exec().then( products => {
        if(products) {
            res.status(200).json({
                count:product.length,
                message: 'All products',
                product: products.map( product => {
                    return {
                        name: product.name,
                        id:product._id,
                        price:product.price,
                        image:product.image
                    }
                })
            })
        }
    }).catch( err => {
        if(err) {
            res.status(200).json({
                error: err
            })
        }
    })
})

router.post('/',upload.single('image'),(req, res, next)=> {
    console.log('submitted file', req.file)
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.file.path
    })

    product.save().then( product => {

       if(product) {
            res.status(201).json({
                message: 'Product created',
                product: {
                    name:product.name,
                    price:product.price,
                    id:product._id,
                    image: product.image
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
})

router.get('/:productID', (req, res, next)=> {
    const id = req.params.productID
    Product.findById(id).exec().then( product => {
        if(product) {
            res.status(200).json({
                message:'Product retrieved',
                product: {
                    name: product.name,
                    id: product.id,
                    price: product.price,
                    image: product.image
                },
            })
        } else {
            res.status(404).json({message: 'Invalid ID'})
        }
    }).catch( err => {
        if(err) {
            res.status(500).json({
                error: {
                    message: "An error occured"
                }
            })
        } 
    })
})

router.patch('/:productID', (req, res,next)=> {
    const id = req.params.productID
    const data = req.body
    const options = { new: true}
    Product.findByIdAndUpdate(id, data, options).then( product => {
        if(product) {
            res.status(200).json({
                message:'Product updated successfully',
                product: {
                    name: product.name,
                    id: product._id,
                    price: product.price,
                    image:product.image
                }
            })
        }
    }).catch(err => {
        console.log('error', err)
    })
})

router.delete('/:productID', (req, res,next)=> {
    const id = req.params.productID
    Product.remove({_id: id}).exec().then( response => {
        if(response) {
            res.status(200).json({ message: 'Product deleted successfully'})
        }
    }).catch( err => {
        if(err) {
            res.status(500).json({
                error: err
            })
        }
    })
})

module.exports = router