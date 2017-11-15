var express = require("express");
var cors = require('cors');
var request = require('request');
var app = express();

var slackWebhook = process.env.SLACK_WEBHOOK

app.use(cors())
// var bodyParser = bodyParser = require('body-parser')

app.use(require('body-parser').json());

//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/public'));


app.post('/process_order', function(req,res) {
  var numberOfMocha = req.body.mocha
  var numberOfAmericano = req.body.americano
  var numberOfEspresso = req.body.espresso
  var numberOfLatte = req.body.latte
  var numberOfMachhiato = req.body.machhiato


  if ( !slackWebhook ) {
    console.log("No notification sent. SLACK_WEBHOOK is not defined")
  }
  else { // send a slack notification
    var headers = {
      'Content-Type':     'application/json'
    }

    // build message
    var message = "Order #123456: \n"
    if (numberOfMocha != 0) {
      message += numberOfMocha + " Mocha\n"
    }
    if (numberOfAmericano != 0) {
      message += numberOfAmericano + " Americano\n"
    }
    if (numberOfEspresso != 0) {
      message += numberOfEspresso + " Espresso\n"
    }
    if (numberOfLatte != 0) {
      message += numberOfLatte + " Latte\n"
    }
    if (numberOfMachhiato != 0) {
      message += numberOfMachhiato + " Machhiato\n"
    }

    message += "########"
    console.log(message)

    var jsonBody = {'username': "Coffee Service", 'text': message }

    console.log(jsonBody)

    var options = {
      url: slackWebhook,
      method: 'POST',
      headers: headers,
      body: jsonBody,
      json: true
    }

    console.log(options)

    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          // Print out the response body
          console.log(body)
      }
    })
  }


  res.send('Ok')
})

var port = process.env.PORT || 3001
app.listen(port, function() {
    console.log("Oder API service is in port: " + port);
});
