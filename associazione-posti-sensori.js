const express = require('express');
const mongoose = require('mongoose');

const app = express();

// associazione postoAuto - sensore (scheda + pin)
const sensoreSchema = mongoose.Schema({
  postoAutoId: { type: String, required: true },
  sensore: { type: String, required: true }
});
const Sensore = mongoose.model('Sensore', sensoreSchema);

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

Sensore.deleteMany({}, function(err) {
  if (err) console.log(err);
});

const sensore = new Sensore({
  postoAutoId: "5cbf3c4128c04b001706b838",
  sensore: "ESPFRN01"
});
sensore.save();

const sensoreH = new Sensore({
  postoAutoId: "5cbf3c4628c04b001706b83a",
  sensore: "ESPFRN03"
});
sensoreH.save();
