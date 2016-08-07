var Twit = require('twit')


function TwitterApi(){
    var JESSIE = new Twit({
        consumer_key:         'ZFYNk1HPBUo7CWHZTROw8KWkS',
        consumer_secret:      'KF2CXiiukDKPtMvikSCFpgjouFymIMSL5AYz6VfdahvT5Cx4YU',
        access_token:         '762182118470451200-hfcBw9tDMezRylzpvpn9HW6lTLxnAR8',
        access_token_secret:  'e2o5msgJAMpbW4mfF4Eqp11fsB4OcgZ9SiIJ8Ou90jq7F',
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    })
    var jessieId = '762182118470451200';

    var WALT = new Twit({
        consumer_key:         '4LuNW3AQiBxXrNuWYPURst0Uu',
        consumer_secret:      '1wUFeIzpeC6IRJjyjLxW0GmTkqoTEmrishYNIS7GKz2shW333A',
        access_token:         '762181838785933312-hciZQxgNldPQyLpdVc528xDJOXkjTwH',
        access_token_secret:  'oxoD6rdAPpxQ9ZErcqJ9FuoOUviDfYD45a3E0IWmXeqis',
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    })
    var waltId = '762181838785933312'
    
    
    function makeWaltFollowJessie(callback){
        followUser(WALT, jessieId, callback)
    }
    
    function makeJesseFollowWalt(callback){
        followUser(JESSIE, waltId, callback)
    }
}

function followUser(twit, target, callback){
    twit.post('friendships/create', { id: target }, callback); 
}

module.exports = TwitterApi()