var express = require("express");
var request = require('request');
var app = express();

app.use(require('body-parser').json());

//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/public'));

app.post('/order', function(req,res) {
  console.log(req.body);

  var headers = {
    'Content-Type':     'application/json'
  }

  var options = {
    url: 'http://order-api:3001/process_order',
    method: 'POST',
    headers: headers,
    body: req.body,
    json: true
  }

  console.log(options)

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(body)
    }
  })
  res.send("Ordered sent to Order API")


})

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
