const bodyParser = require('body-parser')
const express = require('express')
const {
  getCats, getCatById, createCat, deleteCat,
} = require('./controllers/api')

const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', (request, response) => response.render('index'))

app.get('/api/cats', getCats)
app.get('/api/cats/:breeds', getCatById)
app.post('/api/cats', createCat)
app.delete('/api/cats/:id', deleteCat)

app.all('*', (request, response) => response.sendStatus(404))

app.listen(1337, () => {
  console.log('Listening on port 1337...') // eslint-disable-line no-console
})