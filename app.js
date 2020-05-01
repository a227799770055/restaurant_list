const express = require('express')
const app = express()
const port = 3000
const restaurant = require('./restaurant.json')

// hadlebsrs engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

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
  console.log(rest)
  res.render('index', { rest: rest, keyword: keywords })
})

// setting listening 
app.listen(port, () => {
  console.log('the server is listening')
})