const express = require('express')
const app = express()
const port = 3000
const restaurant = require('./models/restaurant')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

// hadlebsrs engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
mongoose.connect("mongodb://localhost/restaurant-list", { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

// 設定 mongodb 連線
const db = mongoose.connection
db.on('error', () => {
  console.log('error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})





// setting listening 
app.listen(port, () => {

})