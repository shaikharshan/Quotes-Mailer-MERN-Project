const express = require('express')
const router = express.Router()
const {getQuote,createQuoteJob,getEmailPermit,removeEmailPermit} = require('../controllers/quote')


router.route('/dashboard').get(getQuote).post(createQuoteJob)
router.route('/mail').post(getEmailPermit).delete(removeEmailPermit)

module.exports = router