const express = require('express')
const app = express()
const port = 3000
const restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
// loading mongodb by mongoose
require('./config/mongoose')

// hadlebsrs engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// setting router
app.use(routes)


// setting listening 
app.listen(port, () => {
  console.log(`the server is running on https://localhost:${port}`)
})