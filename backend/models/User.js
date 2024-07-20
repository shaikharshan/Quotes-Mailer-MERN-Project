const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please provide name'],
      maxlength: 50,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
    },
  },{timestamps:true})

  UserSchema.methods.comparePass =async function(password){
    const isMatch =await bcrypt.compare(password,this.password)
    return isMatch
  }

  UserSchema.methods.createJWT = function () {
    return JWT.sign(
      { userId: this._id, name: this.name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIMIT,
      }
    )
  }

  module.exports = mongoose.model('users',UserSchema)