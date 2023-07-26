// Global variables created
var searchFormEl = document.querySelector("#search-form");
var cityNameEl = document.querySelector("#city-name-input");
var fiveDayForecastEl = document.querySelector("#five-day-forecast-container");
var currentWeatherEl = document.querySelector("#current-weather-container");
var forecastEl = document.querySelector(".weather-container");
var cityListEl = document.querySelector("#city-list");
var deleteButton = document.querySelector(".delete-button");
var searchButton = document.querySelector(".search-button");

// Gets the latitude and longitude based on the city that is searched by the user
function getGeoLocation(cityName) {
    var apiKey = '311f49e649708ffa86c102b22a78e596';
    console.log(cityName);
    var apiUrlGeolocation = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey;
    
    fetch(apiUrlGeolocation)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);
            var latitude = data[0].lat;
            var longitude = data[0].lon;
            console.log(latitude, longitude);
            getCityWeather(latitude, longitude);

            currentWeatherEl.innerHTML = '';
            fiveDayForecastEl.innerHTML = '';
            
            var h3El = document.createElement("h3");
            h3El.textContent = data[0].name;
            currentWeatherEl.append(h3El);
        });
};

// Uses the latitude and longitude to get data on the weather
function getCityWeather(latitude, longitude) {
    console.log("Works!");

    var apiKey = '311f49e649708ffa86c102b22a78e596';
    var apiUrlWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=' + apiKey;

    fetch(apiUrlWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Displaying current temperature information on browser
            var currenttempEl = document.createElement("div");
            currenttempEl.textContent = "Temp (in Farenheit): " + data.current.temp;

            var currentwindEl = document.createElement("div");
            currentwindEl.textContent = "Wind: " + data.current.wind_speed + " MPH";

            var currenthumidityEl = document.createElement("div");
            currenthumidityEl.textContent = "Humidity: " + data.current.humidity + " %";

            var UVISpan = document.createElement("span")
            UVISpan.textContent = data.current.uvi


            var currentuvIndexEl = document.createElement("div");
            currentuvIndexEl.textContent = "UV Index: " + data.current.uvi;            
