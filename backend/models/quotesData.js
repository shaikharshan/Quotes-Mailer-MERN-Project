const mongoose = require('mongoose')

const quoteDataSchema =new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    quote:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    }
})


const quoteData = mongoose.model("quoteData",quoteDataSchema)
module.exports = quoteData