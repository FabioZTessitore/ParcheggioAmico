const express = require('express');

const app = express();


const parcheggi=[
{
_id:'1', 
name:'Budino'
},

{
_id:'2',
name:'kebab'
}
]

app.set('views', __dirname+'/views');
app.set('view engine','ejs');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/admin', function (req, res) {
  res.render('listaparcheggi', {listaparcheggi:parcheggi});
});

app.use( function (req, res)  {
  res.status(404);
  res.sendFile(__dirname + "/public/404.html");
});

app.listen(process.env.PORT || 3000);
