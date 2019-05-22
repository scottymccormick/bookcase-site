const express    = require('express')
const path       = require('path')
const fetch      = require('node-fetch')
const bodyParser = require('body-parser')
const app        = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/static', express.static(path.join(__dirname, 'public')))

// ROUTES

app.post('/', (req, res) => {
  const searchTerm = req.body.search
  fetch('http://localhost:3001/books/search?t=' + searchTerm)
    .then(function(response) {
      return response.json()
    })
    .then(function(parsedJson) {
      const books = parsedJson.items.map(book => book.volumeInfo.title)
      res.render('index', { books })
    })
    .catch(function(err) {
      console.log(err)
      res.render('index', {books: []})
    })
})

app.get('/', (req, res) => {
  res.render('index', {books: []})
})

app.listen(4000, () => {
  console.log('App listening on 4000')
})