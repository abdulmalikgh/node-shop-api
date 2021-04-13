const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref:'Product', required: true,},
    quantity: {type: Number, required: true}
})

module.exports = mongoose.model("Order", OrderSchema)