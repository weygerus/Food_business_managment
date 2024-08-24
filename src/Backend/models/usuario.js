const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

  username: { type: String, required: true, unique: true },

  email: { type: String, required: true, unique: true },

  address: { type: String, required: true, unique: true },

  city: { type: String, required: true, unique: true },

  country: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  confirmPassword: { type: String, required: true, unique: true },

  role: { type: Number, default: 1 },

})

module.exports = mongoose.model('User', userSchema)