const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();

// parcheggio
const parcheggioSchema = mongoose.Schema({
  name: { type: String, required: true },
  indirizzo: { type: String, required: true },
  tariffaoraria: { type: String, required: true }
});
const Parcheggio = mongoose.model('Parcheggio', parcheggioSchema);

// postoAuto
const postoautoSchema = mongoose.Schema({
  name: {type: String, required: true},
  occupato: {type: Boolean, required: true, default: false},
  parcheggioID: {type: String, required:true}
});
const Postoauto= mongoose.model('Postoauto', postoautoSchema);
 

mongoose.connect(
 'mongodb://parcheggioAdmin:cipolla1@ds119548.mlab.com:19548/heroku_21bs4mt6',
 { useNewUrlParser: true },
 function (err) {
   if (err) {
     console.log(err);
     return;
   }
  app.listen(process.env.PORT || 3000);
 }
);

app.set('views', __dirname+'/views');
app.set('view engine','ejs');

app.use( bodyParser.urlencoded( {extended: false} ) );

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/admin', function (req, res) {
  Parcheggio.find()
    .exec( function (err, result) {
      res.render('listaparcheggi', { listaparcheggi: result });
    });
});


app.get('/parcheggi/:id', function (req, res) {
  const id = req.params.id;
  Parcheggio.findOne({ _id: id })
	.exec(function(err, result){
		res.render('modificaparcheggio', {parcheggio: result});
	});
});

app.post('/nuovoparcheggio', function (req, res ) {
  const nuovoParcheggio = new Parcheggio({
    name: req.body.inputNomeP,
    indirizzo: req.body.indirizzo,
    tariffaoraria: req.body.tariffa
  });
  nuovoParcheggio.save().then( function () {
    res.redirect('/admin');
  });
});

app.post('/parcheggio', function(req, res) {
  Parcheggio.updateOne({
    _id: req.body.id
  }, {
    name: req.body.nome,
    indirizzo: req.body.indirizzo,
    tariffaoraria: req.body.tariffaoraria
  }, function (err) {
    res.redirect('/admin');
  });
});

app.post('/postiauto', function(req, res) {
  const nuovoPostoauto = new Postoauto({
    name: req.body.inputNomeP, 
    parcheggioID: req.body.id
  });
  nuovoPostoauto.save().then( function () {
    res.redirect('/postiauto/'+req.body.id);
  });
});

app.get('/postiauto/:id', function (req, res) {
  const id = req.params.id;
  Parcheggio.findOne({ _id: id })
	  .exec(function (err, parcheggio) {
      Postoauto.find({ parcheggioID: id })
        .exec(function (err, postiauto) {
		      res.render('postiauto', {
            parcheggio: parcheggio,
            listaposti: postiauto
          });
        });
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

app.use(function (req, res)  {
  res.status(404);
  res.sendFile(__dirname + "/public/404.html");
});
