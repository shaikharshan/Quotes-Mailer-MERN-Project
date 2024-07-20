const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({

    subscribed:{
        type:Boolean,
        default:false,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'users',
        required:[true,'User must be provided']
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

},{timestamps:true})


module.exports = mongoose.model("Quote", quoteSchema);