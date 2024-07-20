const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError,UnauthenticatedError} = require('../errors/index')
require('dotenv').config()


const register = async(req,res)=>{
    const {name,email,password} = req.body
    
    const salt =await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password,salt)
    const tempUser = {
        name,email,password:hashPass
    }
    const user = await User.create({...tempUser})
    const token =  user.createJWT()
    res.status(StatusCodes.CREATED).json({user,token})
}

const login = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        throw new BadRequestError('Please Provide Correct Email and Password')
    }
    const user = await User.findOne({email})
    // console.log(user)
    if(!user)
        {
            throw new NotFoundError('Email Not Registered. Please provide correct email or Login')
        }
    const isPassword = await user.comparePass(password)
    // console.log(isPassword)
    if(!isPassword)
        {
            throw new UnauthenticatedError('Email/Password is incorrect')
        }
    const token = user.createJWT()
    // console.log(token)
    res.status(StatusCodes.ACCEPTED).json({user,token})
}



module.exports = {
    login,register
}