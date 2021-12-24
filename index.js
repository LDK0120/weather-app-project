let now = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let currentDay = document.querySelector("#current-day");
let currentHour = document.querySelector("#current-hour");
let currentMinute = document.querySelector("#current-minute");

currentDay.innerHTML = days[now.getDay()];
currentHour.innerHTML = ("0"+now.getHours()).slice(-2); //this will add 0 at the beginning. examples: 1pm -> 01pm. 12pm -> 012pm.  Then, it will take the last two digits (01pm -> 01pm. 012pm -> 12pm).
currentMinute.innerHTML = ("0"+now.getMinutes()).slice(-2);

function searchedCityCurrentWeather(event) {
  let city = event;
  let defaultCityName = document.querySelector("#city-heading-left");
  defaultCityName.innerHTML = city;
  let unit = "metric";
  let apiKey = '77f5bbd678dbc6585fd33ab51e79f061';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getTemp);
}

function getTemp(data){
  celciusTemperature = Math.round(data.data.main.temp);
  let description = data.data.weather[0].description;
  let icon = document.querySelector(".weather-emoji-today");
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`);
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = celciusTemperature;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = description;
  let windSpeed = document.querySelector(".windSpeed");
  windSpeed.innerHTML = data.data.wind.speed;
  }

function getWeather(event){
    event.preventDefault();
    searchedCity = document.querySelector("#search-input").value;  
    searchedCity = searchedCity.toLowerCase();
    let cityName = document.querySelector("#city-heading-left");
    cityName.innerHTML = searchedCity;


  let key = '77f5bbd678dbc6585fd33ab51e79f061';
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${key}&units=metric`;

  axios.get(url).then(getTemp);
  }

let celciusTemperature = null;

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", getWeather);

//Convert temperature units
function displayFarenheitUnit (event) {
    event.preventDefault();
    let farenheitTemperature = Math.round((celciusTemperature * 9/5) + 32);
    let currentTemperature = document.querySelector("#current-temperature");
    currentTemperature.innerHTML = farenheitTemperature;
    fTemperature.classList.add("active");
    cTemperature.classList.remove("active");
}

function displayCelciusUnit (event) {
    event.preventDefault();
    let currentTemperature = document.querySelector("#current-temperature");
    currentTemperature.innerHTML = celciusTemperature;
    fTemperature.classList.remove("active");
    cTemperature.classList.add("active");
}

let fTemperature = document.querySelector("#farenheitUnit");
let cTemperature = document.querySelector("#celciusUnit");
fTemperature.addEventListener("click", displayFarenheitUnit);
cTemperature.addEventListener("click", displayCelciusUnit);


searchedCityCurrentWeather("New York");

function displayForecast() {

  let totalColumn = `<div class="row">`;

  let forecastDays = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

   let forecast = document.querySelector("#weatherForecast");
   
  forecastDays.forEach(function(day) {
    totalColumn = totalColumn + `<div class="col-2 forecast-day-one">
                  <div class="forecast-day"><h4>${day}</h4></div>
                  <div class="forecast-icon"><img src="images/partly_cloudy.png" alt=""></div>
                  <div class="forecast-temperature"><h4><span class="max-temp">16 ° </span><span class="min-temp"> 12°</span></h4></div>
                </div>`;
  });
   forecast.innerHTML = totalColumn + `</div>`;
}

displayForecast();

