let now = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let currentDay = document.querySelector("#current-day");
let currentHour = document.querySelector("#current-hour");
let currentMinute = document.querySelector("#current-minute");

currentDay.innerHTML = days[now.getDay()];
currentHour.innerHTML = ("0"+now.getHours()).slice(-2); //this will add 0 at the beginning. examples: 1pm -> 01pm. 12pm -> 012pm.  Then, it will take the last two digits (01pm -> 01pm. 012pm -> 12pm).
currentMinute.innerHTML = ("0"+now.getMinutes()).slice(-2);


function searchedCityCurrentWeather(event) {
  event.preventDefault();  
  let city = document.querySelector("#search-input").value;  
  city = city.toLowerCase();

  function getTemp(data){
  
  celciusTemperature = Math.round(data.data.main.temp);
  let description = data.data.weather[0].description;
  let icon = document.querySelector(".weather-emoji-today");
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`);
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = celciusTemperature;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = description;
  let cityName = document.querySelector("#city-heading-left");
  cityName.innerHTML = city;
  let windSpeed = document.querySelector(".windSpeed");
  windSpeed.innerHTML = data.data.wind.speed;
  }


  let unit = "metric";
  let apiKey = '77f5bbd678dbc6585fd33ab51e79f061';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;


  axios.get(apiUrl).then(getTemp);
}

let celciusTemperature = null;

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", searchedCityCurrentWeather);

function displayFarenheitUnit (event) {
    event.preventDefault();
    let farenheitTemperature = (celciusTemperature * 9/5) + 32;
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


