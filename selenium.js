var browser = require('webdriverio').remote(options)
.init();
var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};

var linkedinUrl = 'https://www.linkedin.com/';

var hackkeys1 = {
    "name": "hackatoncor1@gmail.com",
    "pass": "hackatoncor1234",
    "id": "in/acqua-panna-7003a2127"
}

var hackkeys2 = {
    "name": "hackatoncor2@gmail.com",
    "pass": "hackatoncor1234",
    "id": "in/bibita-gassata-99b3a3127"
}


var manuhackkeys = {
    "name": "emadivizio@gmail.com",
    "pass": "mimed3&mortadella"
}
login(browser, hackkeys1).getCookie().then(function(cookies){
    var url = browser.url(linkedinUrl + hackkeys2.id);
    setCookies(cookies, url)
    url.refresh();
    //watchProfile(browser, cookie, hackkeys2.id);
});



function setCookies(cookies, url){
    for (i = 0; i < cookies.length; i++) { 
        var cookie = cookies[i];
        cookie.domain = ".linkedin.com";
        console.log(cookie);
        url.setCookie(cookie);
    }
}
function login(browser, keys){
    return browser.url(linkedinUrl + 'uas/login')
        .setValue("#session_key-login", keys.name)
        .setValue('#session_password-login', keys.pass)
        .submitForm('#login');
}

function watchProfile(browser, cookies, id){
    browser.url(linkedinUrl + id).setCookie(cookies);
}