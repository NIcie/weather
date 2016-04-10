function toggleUnits(unitsCur, valueCur) {
  var temperature;
  var newUnits;
  // Для перевода температуры из шкалы Фаренгейта в шкалу Цельсия нужно от исходного числа отнять 32 и умножить результат на 5/9. 
  // Для перевода температуры из шкалы Цельсия в шкалу Фаренгейта нужно умножить исходное число на 9/5 и прибавить 32
  if ( document.getElementById("unitsCheck").checked ) {
    newUnits = "metric";
    temperature = Math.round(( valueCur - 32) * 5/9 * 100 ) / 100;
  } else {
    newUnits = "imperial";
    temperature = Math.round( (valueCur * 9/5 + 32) * 100) / 100;
  }
  setUnits(newUnits, temperature);
}

function setUnits(unitsInner, temperature) {
  if (unitsInner === "imperial") {
    $("#tempUnit").html( (temperature !== "") ? "&deg;F" :"");  
    $("#tempValue").html( temperature);  
  } else {
    $("#tempUnit").html( (temperature !== "") ? "&deg;C" :"");  
    $("#tempValue").html( temperature);  
  }
}

function getUnits() {
  var unitsIn = 'metric'; // Celsius
  if( document.getElementById("unitsCheck").checked ) 
    unitsIn = 'imperial'; // if checked - Farenheit
  return unitsIn;
}

function getWeather(lat, lon) {
  var units = getUnits();
  var APIurl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=820965e6baa541c002adefcced4629d7&units=" + units;
  var xhttp;
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
  } else { 
    // code for IE6, IE5
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        checkResult(xhttp);
//        var obj = JSON.parse(xhttp.responseText); 
    }
  };    
  xhttp.open("GET", APIurl, true);
  xhttp.send();     
};

function checkResult(request) {
  var output = document.getElementById("out");
  output.innerHTML = "";
  var obj = JSON.parse(request.responseText);
  $("#town-name").html(obj.name);  
  $("#temp").html("Temperature ");
  var unit = getUnits();
  setUnits(unit, obj.main.temp);
  //$("#tempUnit").html("&deg;" + ((unit === "metric") ? "C" : "F"));
  $("#sky").html(obj.weather[0].main);
  $("#wind").html("Wind speed " + obj.wind.speed + " meter/sec");
  
  var img = new Image();
  img.src = "http://openweathermap.org/img/w/" + obj.weather[0].icon + ".png";
  output.appendChild(img);
  var backgrounds = {};
  backgrounds["01d"] = "clear_sky_day";
  backgrounds["01n"] = "clear_sky_night";
  backgrounds["02d"] = "summer1";
  backgrounds["02n"] = "clouds_day3";
  backgrounds["04d"] = "clouds_day2";
  backgrounds["03d"] = "clouds_day2";
  backgrounds["04n"] = "clouds_night";
  backgrounds["03n"] = "clouds_night";
  backgrounds["10d"] = "rain_day";
  backgrounds["09d"] = "rain_day";
  backgrounds["10n"] = "rain_day3";
  backgrounds["09n"] = "rain_day3";
  backgrounds["11d"] = "thunder3";
  backgrounds["11n"] = "thunder2";
  backgrounds["13d"] = "winter2";
  backgrounds["13n"] = "snow";
  backgrounds["50n"] = "mist";
  backgrounds["50d"] = "mist";
  $("body").css("background", "url(\"http://niciedomen.esy.es/weather/img/" + backgrounds[obj.weather[0].icon] + ".jpg\") no-repeat fixed center");
  $("body").css("background-size", "cover"); 
}

function findGeo() {
  var output = document.getElementById("out");
  if (!navigator.geolocation) {
    output.innerHTML = "Sorry, geolocation is not supported by your browser";
    return;
  }

  function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    getWeather(latitude, longitude);
  };

  function error() {
    output.innerHTML = "Sorry, unable to retrieve your location";
  };
  output.innerHTML = "Locating…";

  navigator.geolocation.getCurrentPosition(success, error);
};

$(document).ready(function() {
  $("#unitsCheck").prop( "checked", false ); // metric - Celsius, not checked
  // $("#showWeather").click(function() {
    var now = new Date();
    $("#curDate").html(now.toDateString());
    $("#curTime").html(now.getHours() + ":" + now.getMinutes());
    findGeo();
  //});
  
  $("#switch").click(function() {
    var unit = getUnits();
    toggleUnits(unit, $("#tempValue").html());
  });
});