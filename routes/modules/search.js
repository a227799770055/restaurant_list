const express = require('express')
const router = express.Router()
const restaurant = require("../../models/restaurant")

router.get('', (req, res) => {
  keywords = req.query.keyword
  dummy = []
  restaurant.find()
    .lean()
    .then(rest => {
      for (item of rest) {
        if (item.name.toLowerCase().includes(keywords.toLowerCase())) {
          dummy.push(item)
        }
        if (item.category.toLowerCase().includes(keywords.toLowerCase())) {
          dummy.push(item)
        }
      }
    })
    .then(res.render('index', { rest: dummy, keyword: keywords }))
    .catch(error => console.log(error))
})

module.exports = router