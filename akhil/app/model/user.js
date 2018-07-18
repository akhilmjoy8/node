const mongoose = require ('mongoose')

//defining schema
const userSchema = mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    houseno: String,
    housename: String,
    landmark: String,
    postoffice: String,
    pin: Number,
    ph_no: Number
  }
)

module.exports = mongoose.model('User',userSchema)