const cron = require('node-cron')
const nodemailer = require('nodemailer')
const Quote = require('./models/Quote')
const env = require('./env')
const quoteData = require('./models/quotesData')


const randomQuote= async()=>{
    var lucky = Math.floor(Math.random()*200)
    // console.log(lucky)
    if(lucky===0)
        {
            lucky = lucky+1;
        }
    const quoteObj = await quoteData.findOne({id:lucky})
    // console.log(quoteObj)
        
   
    return quoteObj;
}

const  sendMailToAllUsers = async(emailObj,quoteObj)=>{
   const transporter =  nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
            user:env.EMAIL,
            pass:env.PASSWORD
        }
    })

    const mailOptions={
        from:env.EMAIL,
        to:emailObj,
        subject:"From Quote Generator Web. Hello User 👋😃, Your Quote of the day is Here !", 
        html: `<h1>Quote Of The Day</h1><h2>${quoteObj.quote}</h2><p>&emsp;- ${quoteObj.author}</p><hr/><span>Quotes By Quote Generator</span>`, // html body
    }
    transporter.sendMail(mailOptions,(err,resp)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            console.log('Mail was sent successfully',resp.response)
        }
    })
}



const sendEmailAll = () =>{
    try {
        cron.schedule('0 10 * * *',async()=>{
            var usersData = await Quote.find({})
            var emails = []
            if(usersData.length>0)
            {
                usersData.map((user)=>{
                    emails.push(user.email);

                }); 
                // console.log(emails)
                const quoteObj = await randomQuote()
                // console.log(quoteObj)
                sendMailToAllUsers(emails,quoteObj)
            }
        })
        
    } catch (error) {
        console.log(error)
        throw(error)
    }

}

module.exports = {sendEmailAll}




