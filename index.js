const express = require('express');

const app = express();

app.get('/', function (req, res) {
  res.end('hello world');
});

app.use( function (req, res)  {
  res.status(404);
  res.sendFile(__dirname + "/public/404.html");
});

app.listen(process.env.PORT || 3000);
