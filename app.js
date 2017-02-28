const express = require('express');
const bodyParser= require('body-parser')
const app = express();
var db

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://alfredo_mongo_user1:v3nFWDkngemhY5OI@cluster0-shard-00-00-ioaui.mongodb.net:27017,cluster0-shard-00-01-ioaui.mongodb.net:27017,cluster0-shard-00-02-ioaui.mongodb.net:27017/database001?ssl=true&replicaSet=cluster0-shard-0&authSource=admin', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
