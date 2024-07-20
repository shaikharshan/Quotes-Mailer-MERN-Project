const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  })
}

// All methods are deprecated in latest nodejs version

module.exports = connectDB