# weather
Simple app, made as an exercise for FreeCodeCamp (https://www.freecodecamp.com/challenges/show-the-local-weather). <br>
It fulfills the below user stories:<br>
<b>User Story</b>: I can see the weather in my current location.<br>
<b>User Story</b>: I can see a different icon AND background image (e.g. snowy mountain, hot desert) depending on the weather.<br>
<b>User Story</b>: I can push a button to toggle between Fahrenheit and Celsius.<br>
It uses the Open Weather API (http://openweathermap.org/current#geo). 

27.05.2016 
Changed the geolocation from Browser geolocation to API geolocation, because getCurrentPosition() and watchPosition() were deprecated on insecure origins.
