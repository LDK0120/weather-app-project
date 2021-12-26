let now = new Date();
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

//get searched city weather
function searchedCityCurrentWeather(event) {
  let city = event;
  let defaultCityName = document.querySelector("#city-heading-left");
  defaultCityName.innerHTML = city;
  let unit = "imperial";
  let apiKey = '77f5bbd678dbc6585fd33ab51e79f061';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getTemp);
}

function getTemp(data){

  let image = "";
  temperature = Math.round(data.data.main.temp);
  let description = data.data.weather[0].main;
  let icon = document.querySelector("#today-weather-image");


  if (description === "Thunderstorm" ) {
    image = "thunder.svg";
      icon.setAttribute("src", `images/${image}`);

  } else if (description === "Clear") {
    image = "day.svg";
      icon.setAttribute("src", `images/${image}`);

  } else if (description === "Snow") {
    image = "snowy-6.svg";
      icon.setAttribute("src", `images/${image}`);

  } else if (description === "Drizzle") {
    image = "rainy-1.svg";
      icon.setAttribute("src", `images/${image}`);

  } else if (description === "Rain") {
    image = "rainy-5.svg";
      icon.setAttribute("src", `images/${image}`);

  } else if (description === "Clouds") {
    image = "cloudy.svg";
      icon.setAttribute("src", `images/${image}`);

  } else {
    icon.setAttribute("src", "http://openweathermap.org/img/wn/50d@2x.png");
  }

  let currentTemp = document.querySelector(".current-temperature");
  currentTemp.innerHTML = temperature;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = description;
  let windSpeed = document.querySelector(".windSpeed");
  windSpeed.innerHTML = data.data.wind.speed;

  let lon = data.data.coord.lon;
  let lat = data.data.coord.lat;
  let forecastApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=77f5bbd678dbc6585fd33ab51e79f061&units=imperial`;
  
  axios.get(forecastApi).then(displayForecast);
  }

function getWeather(event){
    event.preventDefault();
    searchedCity = document.querySelector("#search-input").value;  
    searchedCity = searchedCity.toLowerCase();
    let cityName = document.querySelector("#city-heading-left");
    cityName.innerHTML = searchedCity;


  let key = '77f5bbd678dbc6585fd33ab51e79f061';
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${key}&units=imperial`;

  axios.get(url).then(getTemp);
  }

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", getWeather);

searchedCityCurrentWeather("New York");
  
function convertDt (dt) {
  let entireDateInfo = new Date(dt * 1000);
  let dayInNumeric = entireDateInfo.getDay();
  let exactDay = days[dayInNumeric];
  
  return exactDay;
}

//weather forecast for next 6 days
function displayForecast(forecastData) {
  let forecastdata = forecastData.data.daily;
  let totalColumn = `<div class="row">`;
  let forecast = document.querySelector("#weatherForecast");
  let listOfForecastDays = [];

  let currentDayDt = forecastData.data.current.dt;
  let now = new Date(currentDayDt * 1000);
  let currentDay = document.querySelector("#current-day");
  let currentHour = document.querySelector("#current-hour");
  let currentMinute = document.querySelector("#current-minute");

  let listOfDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  currentDay.innerHTML = listOfDays[now.getDay()];
  currentHour.innerHTML = ("0"+now.getHours()).slice(-2);
  currentMinute.innerHTML = ("0"+now.getMinutes()).slice(-2);

  for (i = 1; i < 7; i++) {
      listOfForecastDays.push(forecastData.data.daily[i]);
  }
  listOfForecastDays.forEach(function(listItem) {
    let description = listItem.weather[0].main;
  if (description === "Thunderstorm" ) {
    description = "images/thunder.svg";
  } else if (description === "Clear") {
    description = "images/day.svg";
  } else if (description === "Snow") {
    description = "images/snowy-6.svg";
  } else if (description === "Drizzle") {
    description = "images/rainy-1.svg";
  } else if (description === "Rain") {
    description = "images/rainy-5.svg";
  } else if (description === "Clouds") {
    description = "images/cloudy.svg";
  } else {
    description = "http://openweathermap.org/img/wn/50d@2x.png";
  }
        totalColumn = totalColumn + `<div class="col-2 forecast-day-one">
                  <div class="forecast-day"><h4>${convertDt(listItem.dt)}</h4></div>
                  <object type="image/svg+xml" data="image.svg">
                        <img id="forecast-icon" src=${description} />
                  </object>
                  <div class="forecast-temperature"><h4><span class="max-temp">${Math.round(listItem.temp.max)}° </span><span class="min-temp"> ${Math.round(listItem.temp.min)}°</span></h4></div>
                </div>`;
  });
   forecast.innerHTML = totalColumn + `</div>`;
}