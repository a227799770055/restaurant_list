const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/restaurant-list", { useNewUrlParser: true, useUnifiedTopology: true })
// 設定 mongodb 連線
const db = mongoose.connection
db.on('error', () => {
  console.log('error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})
module.exports = db