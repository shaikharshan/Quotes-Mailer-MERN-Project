const express = require('express')
const router = express.Router()
const {login,register} = require('../controllers/auth')

router.route('/auth/login').post(login)
router.route('/auth/register').post(register)


module.exports = router
