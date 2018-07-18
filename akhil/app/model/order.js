const mongoose = require ('mongoose')

//defining schema
const orderSchema = mongoose.Schema(
  {
    name: String,
    price: Number
  }
)

module.exports = mongoose.model('Order',orderSchema)