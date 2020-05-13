const express = require('express')
const app = express()
const port = 3000
const restaurant = require('./restaurant.json')
const mongoose = require('mongoose')

// hadlebsrs engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
mongoose.connect("mongodb://localhost/restaurant-list", { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.static('public'))

// 設定 mongodb 連線
const db = mongoose.connection
db.on('eroe', () => {
  console.log('error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// setting routing
app.get('/', (req, res) => {
  res.render('index', { rest: restaurant.results })
})

app.get('/restaurants/:rest_id', (req, res) => {
  console.log(req.params.rest_id)
  rest = restaurant.results.find(item => {
    return item.id == req.params.rest_id
  })
  res.render('show', { rest: rest })
})

app.get('/search', (req, res) => {
  keywords = req.query.keyword

  rest = restaurant.results.filter(item => {
    return item.name.toLowerCase().includes(keywords.toLowerCase())
  })
  rest = restaurant.results.filter(item => {
    return item.category.toLowerCase().includes(keywords.toLowerCase())
  })

  res.render('index', { rest: rest, keyword: keywords })
})

// setting listening 
app.listen(port, () => {

})