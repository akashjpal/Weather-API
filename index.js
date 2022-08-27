const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require('node:https');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "ac8a99c3a1030e12f02a3727d983350d";
  const units = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      var weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const weatherdescription = weatherdata.weather[0].description;
      var iconcode = weatherdata.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
      res.write("<p>Weather description is " + weatherdescription + "</p>");
      res.write("<h1>The temperature in the " + query + " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + iconurl + ">")
      res.send();
    })
  })
})

app.listen(3000, function() {
  console.log("Server has started on port 3000");
})
