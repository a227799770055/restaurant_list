const express = require('express')
const router = express.Router()
const restaurant = require("../models/restaurant")
const home = require('./modules/home')
const rest = require('./modules/rest')
const search = require('./modules/search')

router.use('/', home)
router.use('/restaurants', rest)
router.use('/search', search)



module.exports = router