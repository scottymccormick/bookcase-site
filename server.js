const express = require('express')
const path    = require('path')
const fetch   = require('node-fetch')
const app     = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  fetch('http://localhost:3001/books/search?t=Harry Potter')
    .then(function(response) {
      return response.json()
    })
    .then(function(parsedJson) {
      // console.log(parsedJson)
      const books = parsedJson.items.map(book => book.volumeInfo.title)
      console.log(books)
      res.render('index', { books })
    })
    .catch(function(err) {
      console.log(err)
      res.render('index', {books: []})
    })
})

app.listen(4000, () => {
  console.log('App listening on 4000')
})