const express = require('express');

const app = express();

const bodyParser = require('body-parser')

const mongoose = require('mongoose');

const parcheggioSchema = mongoose.Schema({
  name: { type: String, required: true }
});

const Parcheggio = mongoose.model('Parcheggio', parcheggioSchema);

mongoose.connect(
 'mongodb://parcheggioAdmin:cipolla1@ds119548.mlab.com:19548/heroku_21bs4mt6',
 function (err) {
   if (err) {
     console.log(err);
     return;
   }
  app.listen(process.env.PORT || 3000);
 }
);


app.use( bodyParser.urlencoded( {extended: false} ) );

app.set('views', __dirname+'/views');
app.set('view engine','ejs');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/admin', function (req, res) {
  Parcheggio.find()
  .exec( function (err, result){
    res.render('listaparcheggi', {listaparcheggi:result});
  })
});

app.post('/nuovoparcheggio', function (req,res ){
  const nuovoParcheggio = new Parcheggio({
    name: req.body.inputNomeP
  });
  nuovoParcheggio.save().then( function () {
    res.redirect('/admin');
  });
});

app.post('/rimuoviparcheggio', function(req,res){
  Parcheggio.remove({
    _id: req.body.id
  }, function(err){
    res.redirect('/admin');
  });
});

app.get('/posti', function (req, res) {
  res.render('utenti');
});


app.use( function (req, res)  {
  res.status(404);
  res.sendFile(__dirname + "/public/404.html");
});
