const restaruant = require('../restaurant')
const restaurantJson = require('../../restaurant.json')
const db = require('../../config/mongoose')



// 設定 mongodb 連線
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

