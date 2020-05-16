const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/restaurant-list", { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})
const restaurant = require('./models/restaurant')

restaurant.find()
  .then(rest => {
    for (i of rest) {
      console.log(i.name)
    }
  })