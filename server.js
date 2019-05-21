const express = require('express')
const path    = require('path')
const app     = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(4000, () => {
  console.log('App listening on 4000')
})