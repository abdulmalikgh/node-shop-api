const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type:String, required: true
    },
    price: {
        type:Number, required: true
    },
    image: {type: String, require: true}
})

module.exports = mongoose.model('Product', productSchema)