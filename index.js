var opbeat = require('opbeat').start()

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var webdriverio = require('webdriverio');
var options = {
  desiredCapabilities: {
    browserName: 'firefox'
  }
};

var router = express.Router()

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '233337',
  key: '0a77f43c6b61814e9d27',
  secret: '7fc8f317763e6636e24e',
  encrypted: true
});


var Twitter = require('twitter.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(opbeat.middleware.express())


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});



app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


//HANDSHAKE API
var hands = [];

router.post('/webhook', function(req, res){
  console.log(req.body)
})

router.post('/shake', function(req, res){
  var hand = {
    name: req.body.name + " " + req.body.surname,
    id: req.body.id,
    coord: {
    lat1: req.body.lat1,
      lat2: req.body.lat2,
      lon1: req.body.lon1,
      lon2: req.body.lon2
  }
  }
  hands = shake(hand, hands, res)
})

//REGISTER ROUTER
app.use("/api", router)

//LISTEN
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//HANDSHAKE CODE
function shake(hand, hands, res){
  if(hands.length == 0){
    hands.push(hand)
    pusher.trigger('handshakechannel', 'first', {
      "message": "hello world"
    });
    res.json({message: hand.name + " is trying to shake hands"})
    return hands
  }else if(hands[0].id == hand.id){
    res.json({message: hand.name + " is already trying to shake hands"})
    return hands
  }
  else if(hands.length == 1){
    hands.push(hand)
    pusher.trigger('handshakechannel', 'handshake', {
      "message": "hello world"
    });
    return shakeHands(hands, res)
  }
  return hands
}

function shakeHands(hands, res){
  var hand1 = hands[0]
  var hand2 = hands[1]
Twitter.makeWaltFollowJessie(function(){})
Twitter.makeJessieFollowWalt(function(){})
  res.json({message: hand1.name + " shook hands with " +  hand2.name})
  return []
}


function checkCoord(lat1, lat2, lon1, lon2){
  var R = 6371; // km
  var dLat = (lat2-lat1).toRad();
  var dLon = (lon2-lon1).toRad();
  var lat1 = lat1.toRad();
  var lat2 = lat2.toRad();

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return (d < 5)
}


