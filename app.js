const express = require('express')
const app = express()
const port = 3000
const restaurant = require('./models/restaurant')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// hadlebsrs engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
mongoose.connect("mongodb://localhost/restaurant-list", { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// 設定 mongodb 連線
const db = mongoose.connection
db.on('error', () => {
  console.log('error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// setting routing
app.get('/', (req, res) => {
  restaurant.find()
    .lean()
    .then(rest => res.render('index', { rest }))
    .catch(error => console.log(error))

})

app.get('/restaurants/:rest_id', (req, res) => {
  id = req.params.rest_id
  restaurant.findById(id)
    .lean()
    .then(rest => res.render('show', { rest }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:rest_id/delete', (req, res) => {
  id = req.params.rest_id
  restaurant.findById(id)
    .then(rest => rest.remove())
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:rest_id/edit', (req, res) => {
  id = req.params.rest_id
  restaurant.findById(id)
    .lean()
    .then(rest => res.render('edit', { rest }))
    .catch(error => console.log(error))
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