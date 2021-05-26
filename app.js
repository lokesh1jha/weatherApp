
const express = require("express");
const https = require("https");
const app = express();

app.get("/", function(req, res){
    const query = "London";
   const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=4693f7031d0d859e1247c645d13d0c2a&units=metric";
   https.get(url, function(response){
    console.log(response);

    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description;
        const icon =  weatherData.weather[0].icon;
        const url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<p>The aweather is currently " + weatherDescription + "</p>");
        res.write("<br><h1>The temperature in London is " + temp + " degree Celcius.</h1>");
        res.write("<img src="+ url +" />");
        res.send();
    });
   });
   
});

app.listen(5000, function() {
    console.log("Server is working 5000");
});