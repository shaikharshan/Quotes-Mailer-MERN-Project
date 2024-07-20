const Quote = require('../models/Quote')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError,UnauthenticatedError} = require('../errors/index')
const nodemailer = require('nodemailer')
const {EMAIL,PASSWORD} = require('../env.js')
const Mailgen = require('mailgen')

const getQuote=(req,res)=>{
    res.send('Hello route')
}
const createQuoteJob = async(req,res)=>{
    // console.log(req.user)
    //userId, name in req.user
    req.body.createdBy = req.user.userId
    const userSetting = await Quote.create(req.body)
    res.status(StatusCodes.OK).json({userSetting})
}
const getEmailPermit = async(req,res)=>{
    const {email} = req.body
    const name = req.user.name
    req.body.createdBy = req.user.userId
    req.body.subscribed = true
    const userSetting = await Quote.create(req.body)

    let config={
        service:'gmail',
        auth:{
            user:EMAIL,
            pass:PASSWORD
        }
        
    }
    let transporter = nodemailer.createTransport(config)

    let message ={
        from:EMAIL,
        to:email,
        subject:"From Quote Generator Web, Regarding your daily subscription.", 
        html: `<h1>Hello ${name} , Subscription Successful!</h1><p>This was just a follow up mail to notify you that your subscription was successful. You will receive your daily quotes at 10 AM through this email from now.</p>`, // html body
    }
    // console.log(message)
    transporter.sendMail(message).then(()=>{
        return res.status(201).json({msg:"message received"})
    }).catch((err)=>{
        return res.status(500).json({err:err})
    })
}

const removeEmailPermit = async (req, res) => {
    const { email } = req.body;
    const userId = req.user.userId;

    if (!email) {
        return res.status(400).json({ error: 'Please provide an email for cancelling your subscription' });
    }

    try {
        const result = await Quote.findOneAndDelete({ email: email, createdBy: userId });

        if (!result) {
            return res.status(404).json({ error: 'No subscription found for the given email and user' });
        }
        res.status(200).json({msg:'Deleted Successfully'});
    } catch (err) {
        // console.error('Error deleting document:', err);
        res.status(500).json({ error: 'An error occurred while cancelling the subscription' });
    }
};


module.exports={
    getQuote,createQuoteJob,getEmailPermit,removeEmailPermit
}