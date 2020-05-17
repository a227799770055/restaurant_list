const express = require('express')
const router = express.Router()
const restaurant = require("../../models/restaurant")

// setting routing
router.get('/:rest_id', (req, res) => {
  id = req.params.rest_id
  restaurant.findById(id)
    .lean()
    .then(rest => res.render('show', { rest }))
    .catch(error => console.log(error))
})

router.delete('/:rest_id', (req, res) => {
  id = req.params.rest_id
  restaurant.findById(id)
    .then(rest => rest.remove())
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:rest_id/edit', (req, res) => {
  id = req.params.rest_id
  restaurant.findById(id)
    .lean()
    .then(rest => res.render('edit', { rest }))
    .catch(error => console.log(error))
})

router.put('/:rest_id', (req, res) => {
  id = req.params.rest_id
  const body = req.body
  restaurant.findById(id)
    .then(rest => {
      for (item in body) {
        if (body[item] != "") {
          rest[item] = body[item]
        }
      } return rest.save()
    })
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router