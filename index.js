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

router.post('/shake', function(req, res){
  res.json({message: req.body.name + " shook hand!"})
})


app.use("/api", router)

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


