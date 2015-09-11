var express = require('express');
var crypto = require('crypto');
var sha1 = require('sha1');
var request = require('request');
var bodyParser = require('body-parser')
var methodOverride = require('method-override');

var app = express();

app.set('view engine', 'jade');
app.set('views', './views')

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/', function (req, res) {
  res.render('index.jade');
});

app.get('/token/:token', function (req, res) {
  var hash = request('http://localhost:3001/token/'+req.params.token, 
                    function (error, response, body) {
    res.send(body);
  });

  // request
  //   .get('http://localhost:3001/token/'+req.params.token)
  //   .on('response', function (response) {
  //     var body = '';
  //     response.on('data', function (chunk) {
  //       body += chunk;
  //     });
  //     response.on('end', function () {
  //       res.setHeader('content-type', 'application/json');
  //       res.send(body);
  //     });
  //   })
  //   .on('error', function(err) {
  //     console.log(err)
  //   });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('External app listening at http://%s:%s', host, port);
});