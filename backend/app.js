const express = require('express')
const app = express()
require('express-async-errors');
require('dotenv').config()
const connectDB = require('./db/connect')
const quoteRoute = require('./routes/quote')
const authRoute = require('./routes/auth')
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authMiddleware = require('./middleware/authentication')
const customCron = require('./cron.js')
const cors = require('cors')

customCron.sendEmailAll();

app.use(cors())
app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1/quotes'
    ,authMiddleware
    ,quoteRoute)
app.use('/api/v1',authRoute)


// console.log(process.env.MONGO_URI)   



app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
//middleware



const start=async()=>{

    try {
        const PORT = 5000
        await connectDB(process.env.MONGO_URI)
        console.log('Connected to DB')
        app.listen(PORT,()=>{
            console.log(`Listening on port ${PORT}...`)
        })
    } catch (error) {
        console.log(error)
    }
    
}
start()