const express = require('express')
const router = express.Router()
const restaurant = require("../../models/restaurant")

router.get('/', (req, res) => {
  restaurant.find()
    .lean()
    .then(rest => res.render('index', { rest }))
    .catch(error => console.log(error))
})
module.exports = router