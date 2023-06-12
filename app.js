// &#8451 - degree celcius
// &#x2109 - degree fahrenheit
// api key - 82005d27a116c2880c8f0fcb866998a0

// const Element = document.querySelector(".className")
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const temperatureElement = document.querySelector(".temperature-value p");
const descriptionElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

//App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

//App const and vars
// const celciusSymbol = &#8451;
// const fahrenheitSymbol = &#x2109;

const KELVIN = 273;
//API key
const key = "82005d27a116c2880c8f0fcb866998a0";

// check if browser supports geolocation 
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser does not support geolocation</p>"
}

// set user's position
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude)
}

//show error when there is an issue with getting geolocation service
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML =
      `<p>${error.message}</p>`;
}

//get weather from api
function getWeather(latitude, longitude) {
     let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    // let api = `/api/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            dislayWeather();
        })
}

//display weather to user
function dislayWeather() {
    iconElement.innerHTML = `<img src = "icons/${weather.iconId}.png"/>`;
    temperatureElement.innerHTML = `${weather.temperature.value}&#8451`;
    descriptionElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`

}

//C to F conversion 
function celciusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

//convert temperature when user clicks
temperatureElement.addEventListener("click", function () {
    if (weather.temperature.value === undefined) return;
    if (weather.temperature.unit == "celsius") {
        let fahrenheit = celciusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        temperatureElement.innerHTML = `${weather.temperature.value}&#x2109`;
        weather.temperature.unit = "fahrenheit"
    } else {
        temperatureElement.innerHTML = `${weather.temperature.value}&#8451`;
        weather.temperature.unit = "celcius"
    }
})