const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

  username: { type: String},

  email: { type: String},

  address: { type: String},

  city: { type: String },

  country: { type: String},

  password: { type: String },

  confirmPassword: { type: String },

  role: { type: Number, default: 1 },

})

module.exports = mongoose.model('User', userSchema)