var express = require('express');
var router = express.Router();
var request = require("sync-request");

var cityList = [
  {name: "Paris", desc: "couvert", img: "/images/picto-1.png", temp_min: 14, temp_max: 14},
  {name: "Lyon", desc: "nuageux", img: "/images/picto-1.png", temp_min: 14, temp_max: 14}
]


// GET home page
router.get('/', function(req, res, next) {
  res.render('index');
});


// GET weather page
router.get('/weather', function(req, res, next) {
  res.render('weather', { cityList });
});


// ADD city to your list
router.post('/add-city', function(req, res, next) {
  
  var request = request("GET","https://api.openweathermap.org/data/2.5/weather?q=Auxerre&appid=92862941fe4afacd8c0bdedb902200f7&units=metric&lang=fr");
  var resultWS = JSON.parse(request.body);
  console.log(resultWS)




  var alreadyExists = false

  for (var i=0 ; i<cityList.length ; i++){
    if (cityList[i].name.toLowerCase() == req.body.city.toLowerCase()) {
      alreadyExists = true
    }
  }
    if (alreadyExists === false) {
      cityList.push({name:req.body.city, desc: "here", img: "/images/picto-1.png", temp_min: 12, temp_max: 14 })
    }
  res.render('weather', { cityList });
});


// DELETE city to your list
router.get('/delete-city', function(req, res, next) {
  cityList.splice(req.query.position, 1)
  res.render('weather', { cityList });
});

module.exports = router;
