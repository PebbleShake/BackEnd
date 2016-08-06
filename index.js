var opbeat = require('opbeat').start()

var express = require('express');
var app = express();

var webdriverio = require('webdriverio');
var options = {
  desiredCapabilities: {
    browserName: 'firefox'
  }
};

var router = express.Router()


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(opbeat.middleware.express())


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});




router.get('/handshake', function(req, res){
  res.json({message: "WELCOME!"})
})

var hands = [];

router.post('/shake', function(req, res){
  var hand = {
    name: req.body.name
  }
  shake(hand, hands)
})

app.use("/api", router)

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//CODE


function shake(hand, hands){
  if(hands.length < 2){
    hands.push(hand)
  }else{
    return shakeHands(hands)
  }
  return hands
}

function shakeHands(hands){
  var hand1 = hands[0]
  var hand2 = hands[1]
  console.log(hand1.name + " shook hands with " +  hand2.name)
  return []
}



