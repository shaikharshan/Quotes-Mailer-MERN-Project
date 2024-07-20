const JWT = require('jsonwebtoken') 
require('dotenv')
const {UnauthenticatedError,NotFoundError} = require('../errors/index')

const authMiddleware = async(req,res,next)=>{
    const authHeader = req.headers.authorization
    // console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer'))
    {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    try {
        const token =  authHeader.split(' ')[1]
        const info = await JWT.verify(token,process.env.JWT_SECRET)
        req.user = {userId:info.userId,name:info.name}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Invalid Authentication')
    }

}

module.exports= authMiddleware