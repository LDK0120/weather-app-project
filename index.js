//Display the current date and time
let now = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let currentDay = document.querySelector("#current-day");
let currentHour = document.querySelector("#current-hour");
let currentMinute = document.querySelector("#current-minute");

currentDay.innerHTML = days[now.getDay()];
currentHour.innerHTML = ("0"+now.getHours()).slice(-2); //this will add 0 at the beginning. examples: 1pm -> 01pm. 12pm -> 012pm.  Then, it will take the last two digits (01pm -> 01pm. 012pm -> 12pm).
currentMinute.innerHTML = ("0"+now.getMinutes()).slice(-2);


//Display searched city weather
function searchedCityCurrentWeather(event) {
  event.preventDefault();  
  let city = document.querySelector("#search-input").value;  
  city = city.toLowerCase();

  function getTemp(data){
  
  let temp = Math.round(data.data.main.temp);
  let description = data.data.weather[0].description;
  let icon = document.querySelector(".weather-emoji-today");
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`);
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = temp;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = description;
  let cityName = document.querySelector("#city-heading-left");
  cityName.innerHTML = city;

  }

  let unit = "metric";
  let apiKey = '77f5bbd678dbc6585fd33ab51e79f061';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getTemp);
}

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", searchedCityCurrentWeather);


function currentWeather(event) {
  event.preventDefault();

  function getCurrentWeather(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let unit = "metric";
    let key = '77f5bbd678dbc6585fd33ab51e79f061';
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=${unit}`;
    let testerApi = "https://api.openweathermap.org/data/2.5/weather?lat=34.0686&lon=-117.939&appid=77f5bbd678dbc6585fd33ab51e79f061&units=metric"

    function currentLocationWeather(data) {
      let currentLocationTemperature = Math.round(data.data.main.temp);
      let currentLocationDescription = data.data.weather[0].description;
      let currentLocationName = data.data.name;
      let currentCityName = document.querySelector("#city-heading-left");
      let currentCityTemp = document.querySelector("#current-temperature");
      let currentCityDescription = document.querySelector("#description");
      currentCityName.innerHTML = currentLocationName;
      currentCityTemp.innerHTML = currentLocationTemperature;
      currentCityDescription.innerHTML = currentLocationDescription;
    }
    axios.get(api).then(currentLocationWeather);
  }
  navigator.geolocation.getCurrentPosition(getCurrentWeather);
}

let currentButton = document.querySelector("#current-city-search-form");
currentButton.addEventListener("click", currentWeather);


