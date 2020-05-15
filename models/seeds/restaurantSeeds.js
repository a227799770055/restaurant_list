const mongoose = require('mongoose')
const restaruant = require('../restaurant')
const restaurantJson = require('../../restaurant.json')

mongoose.connect("mongodb://localhost/restaurant-list", { useNewUrlParser: true, useUnifiedTopology: true })

// 設定 mongodb 連線
const db = mongoose.connection
db.on('eroe', () => {
  console.log('error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (const element of restaurantJson.results) {
    restaruant.create({
      name: element.name,
      name_en: element.name_en,
      category: element.category,
      image: element.image,
      location: element.location,
      phone: element.phone,
      google_map: element.google_map,
      rating: element.rating,
      description: element.description
    })
  }

})

